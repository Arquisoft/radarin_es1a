import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomeView } from './components/layouts/HomeView';
import { LoginView } from './components/login/LoginView';
import { Home } from './Home';
import { About } from './About';
import { FriendList } from './FriendList';
import React from 'react';

function App() {
  return (
    <React.Fragment>
      <Router>
      <HomeView/>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={LoginView} />
            <Route path="/about" component={About} />
            <Route path="/FriendList" component={FriendList} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
