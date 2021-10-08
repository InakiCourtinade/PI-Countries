import React from "react";
import styles from "./Country.module.css"


export default function Country({name, image, continent}){
    return(
        <div className={styles.myCountry}>
            <div className={styles.container2}>
            <h2 className={styles.country}>{name}</h2>
            <h3 className={styles.titulo3}>{continent}</h3>
            </div>
            <div className={styles.container}>
            <img  className={styles.flag} src={image} alt="img not found" width="250" height="150"  />
            </div>
        </div>
    )
}