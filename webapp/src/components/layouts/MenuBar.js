import React from "react";
import { slide as Menu } from 'react-burger-menu';
import styled from "styled-components";
import auth from "solid-auth-client";
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
              
                <Menu>
                    <a id="home" className="menu-item" class= "bm-item" href="/">
                        <i class="fa fa-fw fa-map-marker-alt"></i>
                        <span> Home</span>
                    </a>
                    <a id="friends" className="menu-item" class="bm-item" href="/friends">
                        <i class="fas fa-users"></i>
                        <span> Friends</span>
                    </a>
                    <a id="about" className="menu-item" class="bm-item" href="/about">
                        <i class="fa fa-fw fa-user-plus"></i>
                        <span> About</span>
                    </a>
                    <a onClick={ this.showSettings } id="settings" className="menu-item" class="bm-item" href="/settings">
                        <i class="fa fa-cogs"></i>
                        <span> Settings</span>
                    </a>
                    <a id="about" className="menu-item" class="bm-item" href="/login">
                        <i onSelect={() => auth.logout()} class="fas fa-sign-out-alt"></i>
                        <span> Log out</span>
                    </a>
                    
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