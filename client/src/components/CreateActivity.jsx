import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {  getAllCountries, postActivities}  from "../actions";
import {Link} from "react-router-dom"
import styles from "./CreateActivity.module.css"


function validate(activityPost){
    let errors={}
    if(!activityPost.name){
        errors.name= "*requires a name";
    }
    if(activityPost.difficulty < 1 || activityPost.difficulty > 5 ){
        errors.difficulty ="*select difficulty between 1-5"
    }
    if(!activityPost.duration){
        errors.duration= "*requires duration"
    }
    if(!activityPost.season.length){
        errors.season= "*select season";        
    }
    if(!activityPost.countryId.length){
        errors.countryId= "*select country"
    }
    return errors;
}

export default function CreateActivity() {
    const dispatch = useDispatch()
    const countries = useSelector(state => state.countriesUpload)
    

    const [errors, setErrors] = useState({})

    const [activityPost, setActivityPost] = useState({ //creo estado con la actividad q se va a postear
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countryId: []
    })

    useEffect(() => {
        dispatch(getAllCountries())
    }, [])

    
    function handleSelect(e){
        setActivityPost({
            ...activityPost,
            countryId:[...activityPost.countryId, e.target.value]
        })
    }
    function handleSumbit(e){
        e.preventDefault()
        dispatch(postActivities(activityPost))
        setActivityPost({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countryId: []
    })
        
    }
    function handleChange(e){
        setActivityPost({
            ...activityPost,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...activityPost,
            [e.target.name] : e.target.value
        }))
    }


    
    return(
        <div className={styles.all}>
            <div className={styles.posBTN}>
                <Link to="/home">
                    <button className={styles.btn1}>Back Home</button>
                </Link>
            </div>
            <h1>Create Activity</h1>
            <div>
                <form classname={styles.form} onSubmit={(e)=>{handleSumbit(e)}}>
                    <div className={styles.separador}>
                    <label className={styles.label}>Select your Country</label>
                    <select className={styles.inputShape} name ="countryId" onChange={(e)=>{handleSelect(e)}}>
                        <option>Countries</option>
                        {
                            countries.map(count=>(<option key={count.id} value={count.id}>{count.name}</option>))
                        }
                    </select>
                    {
                        errors.countryId && (
                            <p className={styles.warning}>{errors.countryId}</p>
                        )
                    }
                    </div>

                    <div className={styles.separador}>
                    <label className={styles.label}>Activity Name:</label>
                    <input className={styles.inputShape} type="text" value={activityPost.name} name="name" placeholder="Name..."
                     onChange={(e)=>{handleChange(e)}} />
                    {
                        errors.name && (
                            <p className={styles.warning}>{errors.name}</p>
                            )
                    }
                    </div>

                    <div className={styles.separador}>   
                    <label className={styles.label}>Difficulty</label>
                    <input className={styles.inputShape} type="number" value={activityPost.difficulty} name="difficulty" placeholder="From 1 to 5"
                     onChange={(e)=>{handleChange(e)}} />
                    {
                        errors.difficulty && (
                            <p className={styles.warning}>{errors.difficulty}</p>
                        )
                    }
                    </div>

                    <div className={styles.separador}>   
                    <label className={styles.label}>Duration (hours)</label>
                    <input className={styles.inputShape} type="text" value={activityPost.duration} name="duration" placeholder="Duration..." 
                    onChange={(e)=>{handleChange(e)}} />
                    {
                        errors.duration && (
                            <p className={styles.warning}>{errors.duration}</p>
                        )
                    }
                    </div>

                    <div className={styles.separador}>
                    <label className={styles.label}>Season</label>
                    <select className={styles.inputShape} name="season" value={activityPost.season} onChange={(e)=>{handleChange(e)}} >
                        <option value="Season">Season</option>
                        <option value="Verano">Summer</option>
                        <option value="Invierno">Winter</option>
                        <option value="Otoño">Autumn</option>
                        <option value="Primavera">Spring</option>
                    </select>
                    {
                        errors.season && (
                            <p className={styles.warning}>{errors.season}</p>
                        )
                    }
                    </div>
                    
                    <button className={styles.btn2} type="submit">Create!</button>
                </form>
                
            </div>
        </div>
    )
}