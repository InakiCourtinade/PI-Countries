import {React} from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getAllCountries, filterByContinent, getCountriesByName, getActivities, filterActivity } from "../actions/index.js";
import { Link } from "react-router-dom";
import Country from "./Country/Country"
import Paginado from "./Paginado.jsx";
import Order from "./Order/OrderByAlf.jsx";
import OrderByArea from "./Order/OrderByArea.jsx";


export default function Home(){
    
const dispatch = useDispatch();
const countriesLoaded = useSelector((state) => state.showAllCountries);
const [search, setSearch] = useState("");
const [order, setOrder] = useState("asc")
const [area, setArea] =useState("max")
const [currentPage, setCurrentPage] = useState(1); //indica el numero de pagina
const [countriesPerPage, setCountriesPerPage] = useState(9); //indica el numero de paises que muestro por pagina
const indexOfLastCountry = currentPage * countriesPerPage //sirve para 
const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
const currentCountries = countriesLoaded.slice(indexOfFirstCountry, indexOfLastCountry)

const paginado = (pageNumber)=>{
    setCurrentPage(pageNumber)
}
const activities = useSelector((state)=> state.allActivities)

useEffect(()=>{
    dispatch(getAllCountries());
    dispatch(getActivities())
},[])

function handleFilterActivity(e){
    dispatch(filterActivity(e.target.value))
}

function handleOnfilterByContinent(e){
    dispatch(filterByContinent(e.target.value))
 }

 function handleSumbitSearchName(e){
    e.preventDefault(e);
    dispatch(getCountriesByName(search))
    setSearch("")
 }

 function handleOnInputSearchName(e){
     setSearch(e.target.value)
 }

function handdleOnClickCountries(e){ //Me traigo todos los paises
    e.preventDefault()
    dispatch(getAllCountries());
    
    
}



 return (
     <div>
         <div>
             <Link to="/postActivity">
             <button>Create activity</button>
             </Link>
         </div>
        {/* formulario para buscar por pais */}
        <div>
            <form onSubmit={(e) => { handleSumbitSearchName(e) }}>
                <h2>Search your country...</h2>
                <input  type="text" value={search} name="name" placeholder="Country..." onChange={(e) => { handleOnInputSearchName(e) }}/>
                <button type="submit" onClick={e=>handleSumbitSearchName(e)}>Search</button>
            </form>
        </div>

        <div>
            <label>Filter by Activity</label>
            <select onChange={(e)=>{handleFilterActivity(e)}}>
                <option>Activity</option>
                {activities?.length &&
                    activities.map(el=>{
                        return(
                            <option key={el.id} value={el.name}>{el.name}</option>
                        )
                    })
                }
            </select>
        </div>

        <div>
            <button type= "submit" onClick ={(e)=>{handdleOnClickCountries(e)}}>Show all countries</button>
        </div>
         <div>
             <Order order={order} setOrder={setOrder} setCurrentPage={setCurrentPage}/>
         </div>
         <div>
             <OrderByArea area={area} setArea={setArea}/>
         </div>
        <div>
            <select onChange={e=>handleOnfilterByContinent(e)}>
                <option value="All">All</option>
                <option value="Africa">Africa</option>
                <option value ="Antarctic">Antartica</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europa</option>
                <option value="Oceania">Oceania</option>
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
                    <Link to ={`/countries/${el.id}`}>
                    <Country name={el.name} image={el.image} continent={el.continent} key={el.id}/>
                    </Link>
                </div>
            );
        }) 
    }

     </div>
 )

}