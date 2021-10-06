import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import {  getAllCountries, postActivities}  from "../actions";
import {Link} from "react-router-dom"


function validate(activityPost){
    let errors={}
    if(!activityPost.name){
        errors.name= "requires a name";
    }
    if(activityPost.difficulty < 1 || activityPost.difficulty > 5 ){
        errors.difficulty ="select difficulty between 1-5"
    }
    if(!activityPost.duration){
        errors.duration= "requires duration"
    }
    if(!activityPost.season.length){
        errors.season= "select season";        
    }
    if(!activityPost.countryId.length){
        errors.countryId= "select country"
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
        <div>
            <h1>Create Activity</h1>
            <div>
                <Link to="/home">
                    <button>Back Home</button>
                </Link>
            </div>
            <div>
                <form onSubmit={(e)=>{handleSumbit(e)}}>
                    <div>
                    <label>Select your Country</label>
                    <select  name ="countryId" onChange={(e)=>{handleSelect(e)}}>
                        <option>Countries</option>
                        {
                            countries.map(count=>(<option key={count.id} value={count.id}>{count.name}</option>))
                        }
                    </select>
                    {
                        errors.countryId && (
                            <p>{errors.countryId}</p>
                        )
                    }
                    </div>

                    <div>
                    <label>Activity Name:</label>
                    <input type="text" value={activityPost.name} name="name" placeholder="Name..."
                     onChange={(e)=>{handleChange(e)}} />
                    {
                        errors.name && (
                            <p>{errors.name}</p>
                            )
                    }
                    </div>

                    <div>   
                    <label>Difficulty</label>
                    <input type="number" value={activityPost.difficulty} name="difficulty" placeholder="From 1 to 5"
                     onChange={(e)=>{handleChange(e)}} />
                    {
                        errors.difficulty && (
                            <p>{errors.difficulty}</p>
                        )
                    }
                    </div>

                    <div>   
                    <label>Duration (hours)</label>
                    <input type="text" value={activityPost.duration} name="duration" placeholder="Duration..." 
                    onChange={(e)=>{handleChange(e)}} />
                    {
                        errors.duration && (
                            <p>{errors.duration}</p>
                        )
                    }
                    </div>

                    <div>
                    <label>Season</label>
                    <select name="season" value={activityPost.season} onChange={(e)=>{handleChange(e)}} >
                        <option value="Season">Season</option>
                        <option value="Verano">Summer</option>
                        <option value="Invierno">Winter</option>
                        <option value="Otoño">Autumn</option>
                        <option value="Primavera">Spring</option>
                    </select>
                    {
                        errors.season && (
                            <p>{errors.season}</p>
                        )
                    }
                    </div>
                    
                    <button type="submit">Create!</button>
                </form>
                
            </div>
        </div>
    )
}