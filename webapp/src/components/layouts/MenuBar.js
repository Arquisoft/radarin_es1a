import React from "react";
import { slide as Menu } from 'react-burger-menu';
import styled from "styled-components";
import auth from "solid-auth-client";
import { Route, Switch, Link } from "react-router-dom";
import { FriendsView } from "./FriendsView";
import  {About}  from "./../../About";
import { LoginView } from "./LoginView";
import { SettingsView } from "./SettingsView";
import { ProfileView } from "./ProfileView";

const Styles = styled.div`
.bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    left: 20px;
    top: 20px;
  }
  
  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background:#99DE9F;
  }
  
  /* Color/shape of burger icon bars on hover*/
  .bm-burger-bars-hover {
    background: #FFC3A2;
  }
  
  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }
  
  /* Color/shape of close button cross */
  .bm-cross {
    background: #99DE9F;
  }
  
  /*
  Sidebar wrapper styles
  Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
  */
  .bm-menu-wrap {
    position: absolute;
    top: 58px;
    height: 100%;

  }
  
  /* General sidebar styles */
  .bm-menu {
    background: #303030;
    font-size: 1.15em;
    
  }
  
  /* Morph shape necessary with bubble or elastic */
  .bm-morph-shape {
    fill: #303030;
  }
  
  /* Wrapper for item list */
  .bm-item-list {
    color: #99DE9F;
    padding: 0.8em;
    font-size: 1.5em;
  }
  
  /* Individual item */
  .bm-item {
    padding-top: 5%;
    display: inline-block;
    color: #99DE9F;
  }

  .link{
    padding-top: 4%;
    display: inline-block;
    color: #99DE9F;
  }
  
  /* Styling of overlay */
  .bm-overlay {
    background: rgba(0, 0, 0, 0.3);
  }
`;

class MenuBar extends React.Component {
  showSettings (event) {
    event.preventDefault();
    }

  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
        return (
            <Styles>
              <Switch>
              <Route path="/profile" exact render={() => <ProfileView/>} />
              <Route path="/friends" exact render={() => <FriendsView />} />
              <Route path="/about" exact render={() => <About />} />
              <Route path="/settings" exact render={() => <SettingsView />} />
              <Route path="/" exact render={() => <LoginView />} />
              
              </Switch>
                <Menu>
                    <li class= "nav-item">
                      <i class="fa fa-fw fa-map-marker-alt"></i>
                      <Link className="link" to="/" label="Home" value="home">Home</Link>
                    </li>             
                    <li class= "nav-item">
                      <i class="fas fa-user"></i>
                      <Link className="link" to="/profile" label="Profile" value="profile">Profile</Link>
                    </li>
                    <li class= "nav-item">
                      <i class="fas fa-users"></i>
                      <Link className="link" to="/friends" label="Friends" value="friends">Friends</Link>
                    </li>
                    <li class= "nav-item">
                      <i class="fas fa-poll-h"></i>
                      <Link className="link" to="/about" label="About" value="about">About</Link>
                    </li>
                    <li class= "nav-item">
                      <i class="fa fa-cogs"></i>
                      <Link className="link" to="/settings" label="Settings" value="settings">Settings</Link>
                    </li>
                    <li class= "nav-item" onClick={() => {auth.logout(); window.sessionStorage.clear();}}>
                      <i class="fas fa-sign-out-alt"></i>
                      <Link className="link" to="/" label="Login" value="login">Logout</Link>
                    </li>
                </Menu>
            </Styles>
        );
    }
}
export default class MenuSide extends React.Component {
    render() {
      return (
        <MenuBar></MenuBar>
      );
    }
  }