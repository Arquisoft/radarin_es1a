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
import React, { useEffect } from "react";
import { LoggedIn, LoggedOut, useWebId } from "@solid/react";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function App() {

  const solidId = useWebId();

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
        fetch('http://localhost:5000/api/users/location', {
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
    setInterval(enviarUbicacionAServidor, 30000);


  });

  return (    
    <React.Fragment>
      <ReactNotification />
      <LoggedOut><LoginView /></LoggedOut>
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
          </Switch>
        </Router>
      </LoggedIn>
    </React.Fragment>
  );
}

export default App;
