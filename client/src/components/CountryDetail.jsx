import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { getCountriesById } from "../actions";

export default function Detail(){
    const {id} = useParams()
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getCountriesById(id))
    },[])
    const getDetail = useSelector(state=> state.countryDetail)
    

    return(
        <div>
            <div>
                <Link to="/home">
                <button>return home</button>
                </Link>
            </div>
            { getDetail.length > 0 ?
            <div>
                <h3>{getDetail[0].name}</h3>
                <img src={getDetail[0].image} alt="Image not found" />
                <p>ID: {getDetail[0].id}</p>
                <h2>Continent: {getDetail[0].continent}</h2>
                <h2>Capital: {getDetail[0].capital}</h2>
                <h4>Area: {getDetail[0].area} km</h4>
                <h4>Region: {getDetail[0].subregion}</h4>

            </div>            
    
            :<p>Loading...</p>
        }

        <div>
            <h1>Activities:</h1>

            {getDetail[0]?.activities?.length?
                getDetail[0]?.activities.map(a=>{
                    return(
                        <div>
                            <p>Name:  {a.name}</p>
                            <p>Difficulty:  {a.difficulty}</p>
                            <p>Season: {a.season}</p>
                            <p>Duration: {a.duration} </p>
                        </div>


                    )
                }): <p>No hay actividades</p>
        }
        </div>
        </div>
    )
}