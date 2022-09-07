import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { actionUser } from "../../../libs/user";

// Components
import Form from "../../../components/form/form";

const baseState = { password: "", secondPassword: "" };

export default function DeleteUser({ state }){

    const navigator = useNavigate(),
          [passwords, setPasswords] = useState(baseState),
          [error, setError] = useState(baseState),
          [user, setUser] = state;

    useEffect(()=>{

        setPasswords(passwords);
        setError(error);

        return ()=>{
            setPasswords(baseState);
            setError(baseState);
        }
    }, [navigator, error, passwords])

    async function sendDeleteUser(e){
        e.preventDefault();

        try{
            const resDelete = await actionUser({
                ...passwords,
                email: user.email
            }, user.token, "delete", user.id);

            if (resDelete.failed) throw resDelete.failed;

            setUser(null);
            navigator("/signin", {state: null});
            return localStorage.removeItem("login");
        }catch(e){
            console.log(e);
            if (e.indexOf("Primera") !== -1)
            return setError({...baseState, password: e});

            if (e.indexOf("Segunda") !== -1)
            return setError({...baseState, secondPassword: e});
        }
    }

    return(
        <Fragment>
            <Form
                btnName={"Eliminar Cuenta"}
                error={error}
                funcSend={sendDeleteUser}
                placeholders={["Contraseña", "Verifica Contraseña"]}
                state={[passwords, setPasswords]}
                title={"Elimina Cuenta de Notas"}
            />
        </Fragment>
    );
}