import {React} from "react";
import {Link} from "react-router-dom";

export default function LandingPage(){
    return(
        <div>
            <Link to = "/home" >
                <button>Start</button>
            </Link>
        </div>
    )
}