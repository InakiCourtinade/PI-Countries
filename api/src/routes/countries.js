const { Router } = require('express');
const { Country, Activity, country_activity } = require('../db.js'); //importo los modelos conectados
const { Op } = require('sequelize')
const axios = require('axios');

const router = Router();

//Me traigo mis datos de la Api y elijo los datos que quiero que me traiga
const data = async()=>{
    const allCountries = await axios.get("https://restcountries.com/v3/all")
    infoDB = allCountries.data.map(el=>{
        return {
            name:el.name.common ||"name",
            id: el.cca3 || cioc,
            image: el.flags.find(f=>f.includes("png")),
            continent: el.region || "continent not found",
            capital: el.capital && el.capital[0] || "La capital no fue encontrada",
            subregion : el.subregion || "unknown",
            area: el.area
        }
    })
    return infoDB
}
// console.log(data)

//Hago el get a la ruta countries
router.get("/", async(req,res)=>{
    const {name} = req.query;
    const infoCountries = await data(); //llamo mi info de la api
    try {
        let infoCBD = await Country.findAll(); //Hago un request a country, si no tengo nada agrego la info a mi base de datos
        if(infoCBD.length === 0){
            await Country.bulkCreate(infoCountries)
        }
          if(name){
            let allCountries = await Country.findAll({  //si me pasan un nombre por query, hago un request y pregunta si coincide
                where: {
                    name:{
                        [Op.iLike] : `%${name}%`        //iLike no disitngue entre mayusculas o minusculas
                    }
                }
            })
            if(allCountries){
                return res.json(allCountries)
            }else{
                return res.send("Pais no encontrado")
            }
        }else{
            let restcountries = await Country.findAll()
            if(restcountries){
                return res.json(restcountries)
            } else{
                return res.send("Pais no encontrado")
            }
        }
        
    } catch (error) {
        console.log(error)
    }
       //  res.json(infoCountries)
})

const getCountries = async()=>{
    return await Country.findAll({
        include:{
            model: Activity,
            attributes: ["name", "difficulty", "duration", "season"],
            through:{
                attributes: []
            }
        }
    })
}

router.get("/:id", async(req,res)=>{
    const{id} = req.params
    const aCountries = await getCountries();
    try {
        if(id){
        let countriesById = aCountries.filter(el => el.id.toLowerCase() === id.toLowerCase())
        countriesById.length? res.status(200).json(countriesById):
        res.status(400).send("No existe ese Id") 
        }else{
            return res.send("No recibi ningun Id")
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;