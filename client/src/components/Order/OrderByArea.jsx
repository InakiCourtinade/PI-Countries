import React from "react";
import { useDispatch } from "react-redux";
import { orderByArea } from "../../actions";

export default function OrderByArea({area,setArea}){
    const dispatch = useDispatch()

    function handleClickByArea(e){
        if(area === "max"){
            dispatch(orderByArea(area))
            return setArea("min")
        }
        else if(area === "min"){
            dispatch(orderByArea(area))
            return setArea("max")
        }
    }

    return(
        <div>
            <button onClick={e=> handleClickByArea(e)}>Sort by area</button>
        </div>
    )
}