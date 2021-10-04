import React from "react";
import { filterByAlf } from "../../actions";
import { useDispatch } from "react-redux";

export default function Order({order,setOrder, setCurrentPage}){

    const dispatch = useDispatch()

    function handleOnClickAlf(e){
        if(order === "asc"){
            dispatch(filterByAlf(order))
            return setOrder("desc");
        }else if(order === "desc"){
            dispatch(filterByAlf(order))
            return setOrder("asc")
        }
    }
    return(
        <div>
            <button onClick={e=> handleOnClickAlf(e)}>Sort by Name</button>
        </div>
    )

}