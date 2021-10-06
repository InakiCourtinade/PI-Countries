import { GET_COUNTRIES, FILTER_BY_CONTINENT,FILTER_BY_ALF ,GET_COUNTRY_BY_NAME,ORDER_BY_AREA,GET_ALL_ACTIVITIES, GET_COUNTRY_BY_ID,FILTER_ACTIVITY} from "./constants"
import axios from "axios"

export function getAllCountries(){
    return async function(dispatch){
        var allCountries = await axios.get("http://localhost:3001/countries",{
        })
        return dispatch({
        type : GET_COUNTRIES,
        payload: allCountries.data
        });
    }
}
export function getCountriesByName(name){
    return async function(dispatch){
        var byName = await axios.get(`http://localhost:3001/countries?name=${name}`,{
        })
        return dispatch({
        type : GET_COUNTRY_BY_NAME,
        payload: byName.data
        });
    }
}
export function getCountriesById(idCountry){
    return async function(dispatch){
        var byId = await axios.get(`http://localhost:3001/countries/${idCountry}`,{ 
        })
        return dispatch({
        type : GET_COUNTRY_BY_ID,
        payload: byId.data
        });
    }
}

export function filterByContinent(payload){
    return{
        type: FILTER_BY_CONTINENT,
        payload
    }
}

export function filterByAlf(payload){
    return{
        type: FILTER_BY_ALF,
        payload
    }
}

export function orderByArea(payload){
    return {
        type: ORDER_BY_AREA,
        payload
    }
}

export function getActivities(){
    return async function(dispatch){
        var allActivities = await axios.get("http://localhost:3001/activity",{
        })
        return dispatch({
        type : GET_ALL_ACTIVITIES,
        payload: allActivities.data
        });
    }
}
export function postActivities(payload){
    return async function(dispatch){
        var post = await axios.post("http://localhost:3001/activity", payload)
        return post;
    }
}
export function filterActivity(payload){
    return{
        type: FILTER_ACTIVITY,
        payload
    }
}

