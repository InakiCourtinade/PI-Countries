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
                // countryId: countryId(para probar si me funcionaba)
            })
        let countryA = await Country.findByPk(countryId);
        console.log(countryA)
        await countryA.addActivities(newActivities) 
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
        return res.json(activities)
    } catch (err) {
        console.log(error);
    }
})

module.exports = router