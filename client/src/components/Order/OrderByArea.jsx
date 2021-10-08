import React from "react";
import { useDispatch } from "react-redux";
import { orderByArea } from "../../actions";
import styles from "./OrderByArea.module.css"

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
            <button className={styles.btn} onClick={e=> handleClickByArea(e)}>Sort by area</button>
        </div>
    )
}