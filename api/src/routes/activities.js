const { Country, Activity } = require('../db.js');
const { Router } = require('express');
const { Op } = require('sequelize')


const router = Router()

router.post("/", async(req,res)=>{
    const{name, difficulty, duration , season, countryId} = req.body
    console.log(req.body)
    try {
        let newActivities = await Activity.create({
                name: name,
                difficulty: difficulty,
                duration: duration,
                season: season,
                
            })
            for(let i = 0; i<countryId.length;i++){

                const countryA = await Country.findAll({
                    where: {
                        id: countryId[i]
                    }
                })
                await newActivities.addCountries(countryA);
            }
       
        res.send("Se creo la actividad");
        
    } catch (error) {
        console.log(error)
    }
})

router.get("/", async (req, res) => {
    try {
        const activities = await Activity.findAll({
            include: Country
        });
        return res.status(200).json(activities)
    } catch (err) {
        console.log(error);
    }
})

module.exports = router