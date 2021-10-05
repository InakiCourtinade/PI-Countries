import { GET_COUNTRIES,FILTER_BY_CONTINENT,GET_COUNTRY_BY_NAME, FILTER_BY_ALF, ORDER_BY_AREA, GET_ALL_ACTIVITIES, GET_COUNTRY_BY_ID} from "../actions/constants";

const initialState = {
    countriesUpload : [],
    showAllCountries :[],
    allActivities:[],
    countryDetail :[],
}


function rootReducer (state = initialState, action){
    switch(action.type){
        case GET_COUNTRIES :
            return{
                ...state,
                countriesUpload: action.payload,
                showAllCountries: action.payload
            }
        case FILTER_BY_CONTINENT:
            const allCountries = state.countriesUpload
            const countriesFiltered = action.payload === "All"? allCountries : allCountries.filter(c => c.continent === action.payload)
            return{
                ...state,
                showAllCountries: countriesFiltered

            }
        case GET_COUNTRY_BY_NAME:
            return{
                ...state,
                showAllCountries: action.payload
            }
        case GET_COUNTRY_BY_ID :
            return{
                ...state,
                countryDetail : action.payload
            }
        case FILTER_BY_ALF:
            let order = action.payload === "asc" ?
            state.showAllCountries.sort(function(a,b){
                if(a.name > b.name){
                    return 1
                }
                if(b.name >a .name){
                    return -1
                }else{
                    return 0
                }
            }):
            state.showAllCountries.sort(function(a,b){

                if(b.name > a.name){
                    return 1
                }
                if(a.name>b.name){
                    return -1
                }else{
                    return 0
                }
            })
            return{
                ...state,
                showAllCountries: order
            }
            case ORDER_BY_AREA:
                let orderArea = action.payload === "max" ?
                state.showAllCountries.sort(function(a,b){
                    if(a.area > b.area){
                        return 1
                    }
                    if(b.area >a .area){
                        return -1
                    }else{
                        return 0
                    }
                }):
                state.showAllCountries.sort(function(a,b){
    
                    if(b.area > a.area){
                        return 1
                    }
                    if(a.area>b.area){
                        return -1
                    }else{
                        return 0
                    }
                })
                return{
                    ...state,
                    showAllCountries: orderArea
                }
                case GET_ALL_ACTIVITIES :
                    return{
                        ...state,
                        allActivities : action.payload
                    }
                 

        default:
            return state;
    }

}



export default rootReducer;