import {React} from "react";
import {Link} from "react-router-dom";
import styles from "./LandingPage.module.css"


export default function LandingPage(){
    return(
        <div className={styles.all}> 
            <div className={styles.title}>
                <h1 className={styles.title2}>BON VOYAGE!</h1>
            </div>
            <Link to = "/home" >
                <button className = {styles.buttonLP}>Start</button>
            </Link>
        </div>
    )
}