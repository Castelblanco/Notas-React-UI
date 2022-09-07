import api from "../api";
import { signin } from "./user";

export default async function actionNote(data, user, method, id = ""){
    const config = method === "get"
    ?{ headers: { token: user.token } }
    :{
        method: method,
        headers:{
            "Content-Type": "application/json",
            token: user.token
        },
        body: JSON.stringify(data)
    };
    
    try{
        const res = await fetch(`${api}/notes/${id}`, config),
              newNote = await res.json();

        if (newNote.failed === "token Invalid") throw newNote.failed;
        
        return newNote;
    }catch(e){
        const userLocal = JSON.parse(localStorage.getItem("login"));
        user = await signin(userLocal);
        
        return  await actionNote(data, user, method, id);
    }

}