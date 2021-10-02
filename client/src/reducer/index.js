import { GET_COUNTRIES} from "../actions/constants";

const initialState = {
    countriesUpload : [],
}


function rootReducer (state = initialState, action){
    switch(action.type){
        case GET_COUNTRIES :
            return{
                ...state,
                countriesUpload: action.payload
            }
        default:
            return state;
    }

}



export default rootReducer;