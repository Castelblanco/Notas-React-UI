import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signin } from "../../libs/user";

import Form from "../../components/form/form";

const baseState = { email: "", password: "" };

export default function Signin({ setState }){

    const [loginUser, setLoginUser] = useState(baseState),
          [error, setError] = useState(baseState),
          navigator = useNavigate();

    useEffect(()=>{

        return ()=>{
            setError(baseState);
            setLoginUser(baseState);
        }
    }, []);

    async function sendSignin(e){
        e.preventDefault();
        try {
            
            const user = await signin(loginUser);

            if (user.failed) throw user.failed;

            setState(user);
            navigator("/profile", {state: {user}});
            localStorage.setItem("login", JSON.stringify(loginUser));
        }catch(e){
            if (e.indexOf("Correo") !== -1) return setError({...baseState, email: e});
            if (e.indexOf("Contraseña") !== -1) return setError({...baseState, password: e});
        }
    }

    return(
        <Fragment>
            <Form
                btnName={"Iniciar Sesión"}
                error={error}
                funcSend={sendSignin}
                placeholders={["Correo", "Contraseña"]}
                state={[loginUser, setLoginUser]}
                title={"Iniciar Sesión"}
            />
        </Fragment>
    );
}