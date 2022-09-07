import { Fragment, useEffect, useState } from "react";
import actionNote from "../../libs/note";

// Css
import "./notes.css";

// Components
import NotesList from "../../components/note/notes-list";

export default function Notes({ user }){

    const [notes, setNotes]= useState([]),
          [important, setImportant] = useState(1);

    useEffect(()=>{

        (async ()=>{
            const resNotes = await actionNote({}, user, "get", user.id);
            setNotes(resNotes);
        })();

        return ()=>{
            setNotes([]);
            setImportant(1);
        }
    }, [user]);

    const selectImportant = e => setImportant(parseInt(e.target.name)),
          linkStyle = textCheck => textCheck === important
          ? { borderBottom: "4px solid #555" }
          : {};

    return(
        <Fragment>
            <div className="nav_notes">
                <button
                    style={linkStyle(1)}
                    name="1"
                    onClick={selectImportant}
                >
                    Muy Importantes
                </button>
                <button
                    style={linkStyle(2)}
                    name="2"
                    onClick={selectImportant}
                >
                    Importantes
                </button>
                <button
                    style={linkStyle(3)}
                    name="3"
                    onClick={selectImportant}
                >
                    Medio Importantes
                </button>
                <button
                    style={linkStyle(4)}
                    name={4}
                    onClick={selectImportant}
                >
                    Sin Importancia
                </button>
            </div>
            
            <div className="tray_notes">
                <NotesList
                    filterImportant={important}
                    notes={notes}
                    setState={setNotes}
                    user={user}
                />
            </div>
        </Fragment>
    );
}