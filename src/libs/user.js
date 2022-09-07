import api from "../api";

export async function signup(data){
    const { name, lastname, email, password } = data;

    const res = await fetch(`${api}/auth/signup`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, lastname, email, password })
          });

    return await res.json();
}

export async function signin(data){
    const res = await fetch(`${api}/auth/signin`, {
                method: "post",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
          });
    
    return await res.json();
}

export async function actionUser(data, userToken, method, id = ""){
    try{
        const res = await fetch(`${api}/user/${id}`, {
                        method: method,
                        headers: {
                            "Content-Type": "application/json",
                            token: userToken
                        },
                        body: JSON.stringify(data)
                    }),
              resUser = await res.json();
            
        if (resUser.failed === "token Invalid") throw resUser;

        return resUser;
    }catch(e){
        const userLocal = JSON.parse(localStorage.getItem("login")),
              {token} = await signin(userLocal);

        return await actionUser(data, token, method, id);
    }
}