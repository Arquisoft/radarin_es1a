import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomeView } from "./components/layouts/HomeView";
import { LoginView } from "./components/layouts/LoginView";
import { Home } from "./Home";
import { About } from "./About";
import { SettingsView } from "./components/layouts/SettingsView";
import { FriendsView } from "./components/layouts/FriendsView";
import { ProfileView } from "./components/layouts/ProfileView";
import { AdminView } from "./components/layouts/AdminView";
import React, { useEffect } from "react";
import { LoggedIn, LoggedOut, useWebId } from "@solid/react";
import { Nav, Navbar } from "react-bootstrap";
import ReactNotification from "react-notifications-component";
import styled from "styled-components";
import "react-notifications-component/dist/theme.css";
import auth from "solid-auth-client";

const Styles = styled.div`
  .navbar { background-color: #303030; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #99DE9F;
    &:hover { color: #FFC3A2; }
  }
  .navbar-brand {
    font-size: 1.6em;
    font-family: "SF Pro Display","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
    color: #99DE9F;
    &:hover { color: #FFC3A2; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;

function App() {
  const solidId = useWebId();
  window.sessionStorage.setItem('id', solidId);

  // Deberia de sacar la lista de admins de mongo, ahora mismo esta hardcodeado, contraseña 'radarinA1*'
  const adminId = "https://radarines1a.solidcommunity.net/profile/card#me";

  function enviarUbicacionAServidor() {
    if (solidId) {
      console.log("Enviando ubicacion");
      navigator.geolocation.getCurrentPosition((position) => {

        const datos = {
          "solidId": solidId,
          "posicion": {
            "latitud": position.coords.latitude,
            "longitud": position.coords.longitude
          }
        };
        //Cambia cuando este subido a heroku
        fetch("https://radarines1arestapi.herokuapp.com/api/users/location ", { //http://localhost:5000/api/users/location
          method: "post",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(datos)
        });
      });
    }
  }

  useEffect(() => {
    let isMounted = true; // note this flag denote mount status
    
    if (solidId !== adminId && isMounted) {
      setInterval(enviarUbicacionAServidor, 30000);
    }

    return () => { isMounted = false; }; // use effect cleanup to set flag false, if unmounted
  });


  /*// Metodos para usar Mongo para la busqueda de admins, NO FUNCIONAN.
    // Metodo para añadir admins, lo dejo aqui de momento, añadiria el usuario logeado a la lista de admins.
    var addAdmin = async function () {
   
      const datos = {
        "solidId": solidId
      };
   
      var respuesta = await fetch("http://localhost:5000/api/admin/add", {
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
      });
   
    }
   
    // Get admins, si estas en la tabla de admins te redirecciona a la vista de admin.
    var getRespuesta = async function () {
      var respuesta = await fetch("http://localhost:5000/api/admin/list");
      var response = await respuesta.json();
      console.log(response);
      return (response);
    }
  */

  // Actualmente coge el admin de una variable, seria interesante cogerlo del servidor, pero no consegui hacerlo.
  if (solidId !== adminId) {
    return (
      <React.Fragment>
        <ReactNotification />
        <LoggedOut>
          <Router>
           <Route path="/*" component={LoginView} />
          </Router>
        </LoggedOut>
        <LoggedIn>
          <Router>
            <HomeView />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={LoginView} />
              <Route path="/about" component={About} />
              <Route path="/settings" component={SettingsView} />
              <Route path="/friends" component={FriendsView} />
              <Route path="/profile" component={ProfileView} />
              <Route  path="/map/:id" component={Home} />

            </Switch>
          </Router>
        </LoggedIn>
      </React.Fragment>
    );
  }
  else {
    return (
      <React.Fragment>
        <LoggedOut>
          <Router>
            <LoginView />
          </Router>
        </LoggedOut>
        <LoggedIn>
          <Styles>
            <Navbar expand="lg">
              <Navbar.Brand href="/">Radarin</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Nav className="ml-auto">
                <Nav.Link href="/login" onSelect={() => { auth.logout(); window.sessionStorage.clear(); }}> Logout </Nav.Link>
              </Nav>
            </Navbar>
            <AdminView />
          </Styles>
        </LoggedIn>

      </React.Fragment >
    );
  }

}
export default App;
