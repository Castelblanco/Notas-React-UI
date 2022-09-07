import { Fragment, useEffect, useState } from "react";
import { useNavigate, useInRouterContext } from "react-router-dom";
import actionNote from "../../libs/note";

// Css
import "./profile.css";

// Components
import ImportantNote from "../../components/profile/important-note";

export default function Profile({ user }){

    const navigator = useNavigate(),
          [notes, setNotes] = useState([]),
          isFocused = useInRouterContext();

    useEffect(()=>{
        (async ()=>{
            const resNotes = await actionNote({}, user, "get", user.id);
            setNotes(resNotes);
        })();
        
        return ()=> setNotes([]);

    }, [isFocused, navigator, user]);

    async function deleteUser(){
        const checkDelete = window.confirm("Deseas borrar tu cuenta de Notas");

        if (!checkDelete) return;
        return navigator("/profile/delete", {state: {user}});
    }

    return(
        <Fragment>
            {user
            ?<div>
                <div className="btn_option">
                    <button
                        className="btn_edit_profile"
                        onClick={()=> navigator("/profile/update", {state: {user, notes}})}
                    >
                        Editar Perfil</button>
                    <button
                        className="btn_trash_profile"
                        onClick={deleteUser}
                    >
                        Borrar Cuenta
                    </button>
                </div>
                <div className="profile">
                    <h1>Bienvenido {user.name}</h1>
                    <br/>
                    <h3>{user.name} {user.lastname}</h3>
                    <br/>
                    <h3>Notas</h3>
                    <br/>
                    <div className="nums_notes">
                        {
                            [1, 2, 3, 4].map(v =>
                                <ImportantNote
                                    filter={v}
                                    notes={notes}
                                    key={v}
                                />
                            )
                            
                        }
                    </div>
                </div>
             </div>
            :<div></div>
            }
        </Fragment>
    );
}