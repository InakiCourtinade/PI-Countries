import { GET_COUNTRIES } from "./constants"
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
