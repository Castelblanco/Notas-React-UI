import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import actionNote from "../../libs/note";

// Css
import "./notes-list.css";

// Imgs
import Trash from "./trash.svg";
import Edit from "./edit.svg";

export default function NotesList({ filterImportant, notes, setState, user }){

    const notesFilter = notes.filter(v => v.important === filterImportant),
          navigator = useNavigate();

    async function deleteNote(note){
        const check = window.confirm("Estas seguro que deceas borrar esta nota");

        if (!check) return;

        await actionNote(note, user, "delete", note.id);
        const resNotes = await actionNote({}, user, "get", user.id);
        setState(resNotes);
    }
    const background = filter =>
    filter === 1 ? "#f45"
    : filter === 2 ? "#09f"
    : filter === 3 ? "#0f9" : "#999";


    return(
        <Fragment>
            {notesFilter.length > 0
            ? notesFilter.map((v, i)=>
            <div
                className="note"
                key={i}
                style={{backgroundColor: background(filterImportant)}}
            >
                <div className="note_description">
                    <h2>{v.title}</h2>
                    <br/>
                    <p>{v.description}</p>
                </div>
                <div className="tray_btns">
                    <div className="btn_action">
                        <button
                            className="btn_action_edit"
                            onClick={()=> navigator("/notes/update", {state: {note: v, user}})}
                        >
                            <img alt="imagen editar" src={Edit}/>
                        </button>
                        <button
                            className="btn_action_trash"
                            onClick={()=> deleteNote(v)}
                        >
                            <img alt="imagen borrar" src={Trash}/>
                        </button>
                    </div>
                    <p>{v.created_at}</p>
                </div>
            </div>
            )
            : <div className="cero_notes">
                <b>No hay Notas con este nivel de importancia.</b>
            </div>
            }
        </Fragment>
    );
}