import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Fragment, useEffect, useState } from "react";

// pages
import Header from "./pages/header/header";
import Signup from "./pages/auth/signup";
import Signin from "./pages/auth/signin";
import Home from "./pages/home/home";
import Profile from "./pages/profile/profile";
import UpdateProfile from "./pages/profile/update/update-profile";
import DeleteUser from "./pages/profile/delete/delete-user";
import Notes from "./pages/notes/notes";
import CreateNote from "./pages/notes/create/create-note";
import UpdateNote from "./pages/notes/update/update-note";

export default function App() {

  const { state, pathname } = useLocation(),
        [user, setUser] = useState(state ? state.user : null),
        navigator = useNavigate();

  useEffect(()=>{

    if (!user){
      if (pathname === "/" || pathname === "/signup")
      return navigator(pathname);
      
      return navigator("/signin");
    }

  }, [navigator, user, pathname, state]);

  return (
    <Fragment>
      
      <Header user={user}/>

      <main style={{position: pathname === "/" ? "absolute" : "static"}}>
        
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup setState={setUser}/>}/>
          <Route path="/signin" element={<Signin setState={setUser}/>}/>
          <Route path="/profile" element={<Profile user={user}/>}/>
          <Route
            path="/profile/update"
            element={<UpdateProfile userState={[user, setUser]}/>}
          />
          <Route
            path="/profile/delete"
            element={<DeleteUser state={[user, setUser]}/>}
          />
          <Route path="/notes" element={<Notes user={user}/>}/>
          <Route path="/notes/create" element={<CreateNote user={user}/>}/>
          <Route path="/notes/update" element={<UpdateNote user={user}/>}/>
        </Routes>
      </main>

      <footer
        style={{display: pathname === "/" || pathname === "/signin" || pathname === "/signup"
          ? "block" : "none",
          position: pathname === "/signin" || "/"
          ? "absolute" : "static"
        }}
      >
        Desarrollado y diseñado por Esteban Javier Castelblanco García. ©2022. Todos los derechos reservados.
      </footer>
    </Fragment>
    
  );
}