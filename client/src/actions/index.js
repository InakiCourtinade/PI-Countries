import { GET_COUNTRIES, FILTER_BY_CONTINENT,FILTER_BY_ALF ,GET_COUNTRY_BY_NAME,ORDER_BY_AREA} from "./constants"
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

