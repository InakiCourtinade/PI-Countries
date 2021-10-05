import React from "react";
import { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { getActivities}  from "../actions";

export default function createActivity(){
    const dispatch = useDispatch()
    const activities = useSelector(state => state.allActivities)
    const [input, setInput] = useState({
        name : "",
        difficulty: "",
        

    })
}