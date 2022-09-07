import { Fragment, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "../../libs/user";

// Components
import Form from "../../components/form/form";

const baseState = { name: "", lastname: "", email: "", password: "", secondPassword: "" };

export default function Signup({ setState }){

    const [ dataUser, setDataUser ] = useState(baseState),
          [ error, setError ] = useState(baseState),
          navigator = useNavigate();


    useEffect(()=>{
    
        return ()=>{
            setDataUser(baseState);
            setError(baseState);
        }
    }, []);

    async function SendRegister(e){
        e.preventDefault();
        const { email, password, secondPassword } = dataUser;
        if (password !== secondPassword) return setError({...error, secondPassword: "Verificación fallida"});

        try {
            
            const user = await signup(dataUser);
            
            if (user.failed) throw user.failed;

            setState(user);
            navigator("/profile", { state: {user}});
            localStorage.setItem("login", JSON.stringify({password, email}));
        }catch(e){
            if (e.indexOf("Nombre") !== -1) return setError({...baseState, name: e});
            if (e.indexOf("Apellido") !== -1) return setError({...baseState, lastname: e});
            if (e.indexOf("Correo") !== -1) return setError({...baseState, email: e});
            if (e.indexOf("Contraseña") !== -1) return setError({...baseState, password: e});
        }
    }

    return(
        <Fragment>
            <Form
                btnName={"Registrarse"}
                error={error}
                funcSend={SendRegister}
                placeholders={["Nombre", "Apellido", "Correo", "Contraseña", "Verifique Contraseña"]}
                state={[dataUser, setDataUser]}
                title={"Registrate"}
            />
        </Fragment>
    );
}