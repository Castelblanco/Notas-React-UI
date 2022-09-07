import { Fragment, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import actionNote from "../../../libs/note";

// Components
import Form from "../../../components/form/form";

const baseState = {title: "", description: "", important: ""};

export default function UpdateNote({ user }){

    const { state } = useLocation(),
          note = state ? state.note : null,
          [updateNote, setUpdateNote] = useState(state
            ?{
                title: note.title,
                description: note.description,
                important: note.important
            }: {}
          ),
          [error, setError] = useState(baseState),
          navigator = useNavigate();

    useEffect(()=>{
        if (!note) return navigator("/signin");
    });

    async function sendUpdateNote(e){
        e.preventDefault();
        try{
            const newNote = await actionNote({
                ...updateNote, created_user: user.id
            }, user, "put", note.id);

            if (newNote.failed) throw newNote.failed;

            navigator("/notes", {state: {user}});
        }catch(e){
            console.log(e);
            if (e.indexOf("titulo") !== -1)
            return setError({...baseState, title: e});

            if (e.indexOf("descripción") !== -1)
            return setError({...baseState, description: e});

            return setError({...baseState, important: e});
        }
    }

    return(
        <Fragment>
            <Form
                btnName={"Editar"}
                error={error}
                funcSend={sendUpdateNote}
                placeholders={["Titulo", "Descripción", "Importancia"]}
                state={[updateNote, setUpdateNote]}
                title={"Editar Nota"}
            />
        </Fragment>
    );
}