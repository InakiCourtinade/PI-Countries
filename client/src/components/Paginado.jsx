import React from "react";

export default function Paginado({countriesLoaded, countriesPerPage, paginado}){
    const pageNumbers = []

    for(let i = 1; i <= Math.floor(countriesLoaded/countriesPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <nav>
            <ul>
            {pageNumbers &&
                pageNumbers.map(number=>(
                    <li key={number}>
                        <a onClick={()=> paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
        
    )
}

