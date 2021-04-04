import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomeView } from './components/layouts/HomeView';
import { LoginView } from './components/login/LoginView';
import { Home } from './Home';
import { About } from './About';
import { FriendsView } from './FriendsView';
import React, { useEffect } from 'react';
import { useWebId } from '@solid/react';

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
        }
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

  };



  useEffect(() => {
    setInterval(enviarUbicacionAServidor, 30000);


  });



  return (
    <React.Fragment>
      <Router>
        <HomeView />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginView} />
          <Route path="/about" component={About} />
          <Route path="/FriendsView" component={FriendsView} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
