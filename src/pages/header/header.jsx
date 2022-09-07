import { Fragment, useState } from "react";
import { Link, useLocation } from "react-router-dom";

// Css
import "./header.css"

// Imgs
import Icon from "./icon.png";
import Menu from "./menu.svg";
import Row from "./row.svg";

export default function Header({ user }){

    const { state, pathname } = useLocation(),
          [navbar, setNavbar] = useState(true),
          linkLocation = {backgroundColor: "#aaa7", padding: "10px"},
          stylelink = url => pathname === url ? linkLocation : {},
          showNavbar = ()=> setNavbar(!navbar);

    return(
        <Fragment>
            <header>
                <div className="icon">
                    <img src={Icon} alt="Icono"/>
                    <Link state={{user}} to="/"><h1>Notas</h1></Link>
                </div>

                <div className="menu">
                    <img src={Menu} alt="Menu" onClick={showNavbar}/>
                </div>

                <nav style={{right: navbar ? "-350px" : "0"}}>
                    {user
                    ?<ul>
                        <img src={Row} alt="Flecha" onClick={showNavbar}/>
                        <li><Link state={{user}} to="/notes/create" style={stylelink("/notes/create")}>Crear Nota</Link></li>
                        <li><Link state={{user}} to="/notes" style={stylelink("/notes")}>Notas</Link></li>
                        <li><Link state={{user}} to="/profile" style={stylelink("/profile")}>Perfil</Link></li>
                        <li><Link state={null} to="/signin" style={stylelink("/signin")}>Cerrar Sesión</Link></li>
                     </ul>

                    :<ul style={{justifyContent: "right", width: "40vw"}}>
                        {pathname === "/signin"
                        ?<li><Link to="/signup">Registrase</Link></li>
                        :<li><Link to="/signin">Iniciar Sesión</Link></li>
                        }         
                     </ul>
                    }
                </nav>
            </header>
        </Fragment>
    );
}