import {React} from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getAllCountries } from "../actions/index.js";
import { Link } from "react-router-dom";
import Country from "./Country"
import Paginado from "./Paginado.jsx";

export default function Home(){
    
const dispatch = useDispatch();
const countriesLoaded = useSelector((state) => state.countriesUpload);
const [currentPage, setCurrentPage] = useState(1); //indica el numero de pagina
const [countriesPerPage, setCountriesPerPage] = useState(9); //indica el numero de paises que muestro por pagina
const indexOfLastCountry = currentPage * countriesPerPage //sirve para 
const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
const currentCountries = countriesLoaded.slice(indexOfFirstCountry, indexOfLastCountry)

const paginado = (pageNumber)=>{
    setCurrentPage(pageNumber)
}


useEffect(()=>{
    dispatch(getAllCountries());
},[dispatch])


 function handdleOnClickCountries(e){
     e.preventDefault(e)
     dispatch(getAllCountries());

 }

 return (
     <div>
        <div>
       <select>
           <option value="asc">Ascendente</option>
           <option value="desc">Descendente</option>
       </select>
        </div>
        <div>
            <button type= "submit" onClick ={(e)=>{handdleOnClickCountries(e)}}>Cargar todos los paises</button>
        </div>
        <div>
            <select>
                <option value="all">Todos</option>
                <option value="africa">Africa</option>
                <option value="americas">Americas</option>
                <option value="asia">Asia</option>
                <option value="europe">Europa</option>
                <option value="oceania">Oceania</option>
            </select>
        </div>
        <Paginado
        countriesPerPage = {countriesPerPage}
        countriesLoaded = {countriesLoaded.length}
        paginado = {paginado}
        />
    {
                currentCountries?.map(el =>{
            return (
                <div>
                    <Link to ={`/home/${el.id}`}>
                    <Country name={el.name} image={el.image} continent={el.continent} key={el.id}/>
                    </Link>
                </div>
            );
        }) 
    }

     </div>
 )

}