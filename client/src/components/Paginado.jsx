import React from "react";
import styles from "./Paginado.module.css"

export default function Paginado({countriesLoaded, countriesPerPage, paginado}){
    const pageNumbers = []

    for(let i = 1; i <= Math.floor(countriesLoaded/countriesPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul className={styles.ul}>
            {pageNumbers &&
                pageNumbers.map(number=>(
                    <li key={number}>
                        <a className={styles.container} onClick={()=> paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
        
    )
}

