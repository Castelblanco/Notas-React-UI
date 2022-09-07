import { Fragment, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// Css
import "./home.css";

// Imgs
import HomeImg from "./home.jpg";

export default function Home(){

    const state = useLocation().state,
          user = state ? state.user : null,
          navigator = useNavigate();

    useEffect(()=>{

        if (user) return navigator("/profile", { state: {user} })

    }, [navigator, user]);

    return(
        <Fragment>
            <img className="img_home" src={HomeImg} alt="imagen de home"/>
            <div className="home">
                <h1>Bienvenido a Notas</h1>
                <p>
                    Crea las <b>Notas</b> más importantes aquí, puedes clasificarlas por niveles de importancia, Registrate para empezar, si ya haz creado una cuenta Inicia Sesión. 
                </p>
            </div>
        </Fragment>
    );
}