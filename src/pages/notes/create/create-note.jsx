import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import actionNote from "../../../libs/note";

// Components
import Form from "../../../components/form/form";

const baseState = { title: "", description: "", important: ""};

export default function CreateNote({ user }){

    const [note, setNote] = useState(baseState),
          [errNote, setErrNote] = useState(baseState),
          navigator = useNavigate();

    useEffect(()=>{
        setNote(note);
        setErrNote(baseState);

        return ()=>{
            setNote(baseState);
            setErrNote(baseState);
        }
    }, [note, user, navigator]);

    async function sendNote(e){
        e.preventDefault();

        try{
            let newNote = await actionNote({...note, created_user: user.id}, user, "post");

            if (newNote.failed) throw newNote.failed;

            navigator("/notes", {state: {user}});
        }catch(e){
            if (e.indexOf("titulo") !== -1)
            return setErrNote({...baseState, title: e});

            if (e.indexOf("descripción") !== -1)
            return setErrNote({...baseState, description: e});

            return setErrNote({...baseState, important: e});
        }
    }

    return(
        <Fragment>
            <Form
                state={[note, setNote]}
                error={errNote}
                funcSend={sendNote}
                title={"Crear Nota"}
                placeholders={["Titulo", "Descriptción"]}
                btnName={"Crear Nota"}
            />
        </Fragment>
    );
}