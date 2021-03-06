import {React} from "react";
import { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { getAllCountries, filterByContinent, getCountriesByName, getActivities, filterActivity } from "../actions/index.js";
import { Link } from "react-router-dom";
import Country from "./Country/Country"
import Paginado from "./Paginado.jsx";
import Order from "./Order/OrderByAlf.jsx";
import OrderByArea from "./Order/OrderByArea.jsx";
import styles from "./Home.module.css"


export default function Home(){
    
const dispatch = useDispatch();
const countriesLoaded = useSelector((state) => state.showAllCountries);
const [search, setSearch] = useState("");
const [order, setOrder] = useState("asc")
const [area, setArea] =useState("max")
const [currentPage, setCurrentPage] = useState(1); //indica el numero de pagina
const [countriesPerPage, setCountriesPerPage] = useState(9); //indica el numero de paises que muestro por pagina
const indexOfLastCountry = currentPage * countriesPerPage //Hasta q pais mostrar 
const indexOfFirstCountry = indexOfLastCountry - countriesPerPage // desde que pais mostrar
const currentCountries = countriesLoaded.slice(indexOfFirstCountry, indexOfLastCountry) //paises q se muestran en la pagina

const paginado = (pageNumber)=>{
    setCurrentPage(pageNumber)
}
const activities = useSelector((state)=> state.allActivities)

useEffect(()=>{
    dispatch(getAllCountries()); //Me traigo mis paises y actividades cuando se monta mi componente
    dispatch(getActivities())
},[])

function handleFilterActivity(e){
    dispatch(filterActivity(e.target.value)) // dispacth de mi accion que filtra por actividad
}

function handleOnfilterByContinent(e){
    dispatch(filterByContinent(e.target.value)) //dipatch de mi accion que filtra por continente
 }

 function handleSumbitSearchName(e){
    e.preventDefault(e);
    dispatch(getCountriesByName(search)) // dispatch me mi accion que filtra por name
    setSearch("")                        //Seteo mi estado vacio de nuevo
 }

 function handleOnInputSearchName(e){   //Seteo mi estado search
     setSearch(e.target.value)
 }

function handdleOnClickCountries(e){ //Me traigo todos los paises
    e.preventDefault()
    dispatch(getAllCountries());
    
    
}



 return (
     <div>
         
        {/* formulario para buscar por pais */}
        <div>
            <form onSubmit={(e) => { handleSumbitSearchName(e) }}>
                <h2 className={styles.title}>Search your country...</h2>
                <input type="text" value={search} name="name" placeholder="Country..." onChange={(e) => { handleOnInputSearchName(e) }} className={styles.input}/>
                <button className={styles.btn} type="submit" onClick={e=>handleSumbitSearchName(e)}>Search</button>
            </form>
        </div>
        
        <div className={styles.sectionFilters}>
        <div>
             <Link to="/postActivity">
             <button className={styles.btn}>Create activity</button>
             </Link>
         </div>

        <div>
            
            <select className={styles.btn} onChange={(e)=>{handleFilterActivity(e)}}>
                <option value="Select Activity" className={styles.opciones}>Select activity</option>
                {activities?.length &&
                    activities.map(el=>{
                        return(
                            <option className={styles.opciones} key={el.id} value={el.name}>{el.name}</option>
                        )
                    })
                }
            </select>
        </div>

        <div>
            <button className={styles.btn} type= "submit" onClick ={(e)=>{handdleOnClickCountries(e)}}>Show all countries</button>
        </div>
         <div>
             <Order order={order} setOrder={setOrder} setCurrentPage={setCurrentPage}/>
         </div>
         <div>
             <OrderByArea area={area} setArea={setArea}/>
         </div>
        <div>
            <select className={styles.btn} onChange={e=>handleOnfilterByContinent(e)}>
                <option className={styles.opciones} value="All">All</option>
                <option className={styles.opciones} value="Africa">Africa</option>
                <option className={styles.opciones} value ="Antarctic">Antartica</option>
                <option className={styles.opciones} value="Americas">Americas</option>
                <option className={styles.opciones} value="Asia">Asia</option>
                <option className={styles.opciones} value="Europe">Europa</option>
                <option className={styles.opciones} value="Oceania">Oceania</option>
            </select>
        </div>
        </div>
        <Paginado
        countriesPerPage = {countriesPerPage}
        countriesLoaded = {countriesLoaded.length}
        paginado = {paginado}
        />
        <div className={styles.sectionCountries}>
            {
                currentCountries?.map(el =>{
            return (
                    <Link to ={`/countries/${el.id}`} className={styles.link}>
                    <Country  name={el.name} image={el.image} continent={el.continent} key={el.id}/>
                    </Link>
            );
        }) 
             }
    </div>

     </div>
 )

}