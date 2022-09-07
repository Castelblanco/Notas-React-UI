import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { actionUser } from "../../../libs/user";

// Components
import Form from "../../../components/form/form";

const baseState = {name: "", lastname: "", email: ""};

export default function UpdateProfile({ userState }){

    const [user, setState] = userState,
          [error, setError] = useState(baseState),
          navigator = useNavigate();

    if (!user) return navigator("/singin");

    async function sendUpdateUser(e){
        e.preventDefault();
        try{
            const updateUser = await actionUser(user, user.token, "put");

            if (updateUser.failed) throw updateUser.failed;

            setState(updateUser);
            const userLocal = JSON.parse(localStorage.getItem("login"));
            userLocal.email = updateUser.email;
            
            localStorage.setItem("login", JSON.stringify(userLocal));
            return navigator("/profile", {state: {user: updateUser}});
        }catch(e){
            if (e.indexOf("Nombre") !== -1)
            return setError({...baseState, name: e});

            if (e.indexOf("Apellido") !== -1)
            return setError({...baseState, lastname: e});

            if (e.indexOf("Correo") !== -1)
            return setError({...baseState, email: e});
        }
    }

    return(
        <Fragment>
            <Form
                btnName={"Editar"}
                error={error}
                funcSend={sendUpdateUser}
                placeholders={["Nombre", "Apellido", "Correo"]}
                state={user ? userState : [null, setState]}
                title={"Editar Perfil"}
            />
        </Fragment>
    );
}