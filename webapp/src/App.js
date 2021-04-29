import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomeView } from "./components/layouts/HomeView";
import { Home } from "./Home";
import { AdminView } from "./components/layouts/AdminView";
import React, { useEffect } from "react";
import { LoggedIn, LoggedOut, useWebId } from "@solid/react";
import styled from "styled-components";
import "react-notifications-component/dist/theme.css";
import cache from "./components/friends/UserCache";
import { GetUserState } from "./components/user/StateManager";
import Welcome from "./views/welcome/Welcome";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { LoginView } from "./components/layouts/LoginView";
import WelcomePage from "./components/menus/Welcome";
import CreatorsView from "./views/welcome/Creators";
import { FriendsView } from "./components/layouts/FriendsView";
import { SettingsView } from "./components/layouts/SettingsView";
import { ProfileView } from "./components/layouts/ProfileView";

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


function enviarUbicacionAServidor(solidId) {
  if (solidId) {
    console.log("Enviando ubicacion");

    navigator.geolocation.getCurrentPosition((position) => {

      let time = new Date();
      const datos = {
        "solidId": solidId,
        "posicion": {
          "latitud": position.coords.latitude,
          "longitud": position.coords.longitude,
        },
        "userState": sessionStorage.getItem("userState"),
        "timeStamp": time.getTime()
      };

      //Cambia cuando este subido a heroku
      fetch("https://radarines1arestapi.herokuapp.com/api/users/location", { //  http://localhost:5000/api/users/location
        method: "post",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(datos)
      });
      new Promise(resolve => setTimeout(resolve, 2000));
    });
  }
}

function App() {
  const solidId = useWebId();
  window.sessionStorage.setItem("id", solidId);
  cache.loadFriends();

  if (window.sessionStorage.getItem("userState") === null) {
    GetUserState().then(function (result) {
      window.sessionStorage.setItem("userState", result);
    });
  }

  // Deberia de sacar la lista de admins de mongo, ahora mismo esta hardcodeado, contraseña "radarinA1*"
  const adminId = "https://radarines1a.solidcommunity.net/profile/card#me";

  useEffect(() => {
    setInterval(enviarUbicacionAServidor(solidId), 30000);
  });

  if (solidId !== adminId) {
    return (
      <React.Fragment>
        <ReactNotification />
        <LoggedOut>
          <Router>
            <Route path="/*" component={Welcome} />
            <Route path="/" component={WelcomePage} exact={true} />
            <Route path="/welcome" component={WelcomePage} />
            <Route path="/creators" component={CreatorsView} />
            <Route path="/login" component={LoginView} />
          </Router>

        </LoggedOut>
        <LoggedIn>
          <Router>
            <HomeView />
            <Switch>
              <Route path="/welcome" component={WelcomePage} />
              <Route exact path="/" render={() => <Home />} />
              <Route path="/map/:id" render={() => <Home />} />
              <Route path="/profile" exact render={() => <ProfileView />} />
              <Route path="/friends" exact render={() => <FriendsView />} />
              <Route path="/settings" exact render={() => <SettingsView />} />
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
            <Route path="/*" component={Welcome} />
            <Route path="/" component={WelcomePage} exact={true} />
            <Route path="/welcome" component={WelcomePage} />
            <Route path="/creators" component={CreatorsView} />
            <Route path="/login" component={LoginView} />
          </Router>
        </LoggedOut>
        <LoggedIn>
          <Styles>
            <AdminView />
          </Styles>
        </LoggedIn>

      </React.Fragment >
    );
  }

}
export default App;
