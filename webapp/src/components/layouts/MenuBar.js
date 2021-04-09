import React from "react";
import { slide as Menu } from 'react-burger-menu';
import styled from "styled-components";
const Styles = styled.div`
.bm-burger-button {
    position: fixed;
    width: 36px;
    height: 30px;
    left: 36px;
    top: 36px;
  }
  
  /* Color/shape of burger icon bars */
  .bm-burger-bars {
    background: #373a47;
  }
  
  /* Color/shape of burger icon bars on hover*/
  .bm-burger-bars-hover {
    background: #a90000;
  }
  
  /* Position and sizing of clickable cross button */
  .bm-cross-button {
    height: 24px;
    width: 24px;
  }
  
  /* Color/shape of close button cross */
  .bm-cross {
    background: #bdc3c7;
  }
  
  /*
  Sidebar wrapper styles
  Note: Beware of modifying this element as it can break the animations - you should not need to touch it in most cases
  */
  .bm-menu-wrap {
    position: fixed;
    height: 100%;
  }
  
  /* General sidebar styles */
  .bm-menu {
    background: #373a47;
    padding: 2.5em 1.5em 0;
    font-size: 1.15em;
  }
  
  /* Morph shape necessary with bubble or elastic */
  .bm-morph-shape {
    fill: #373a47;
  }
  
  /* Wrapper for item list */
  .bm-item-list {
    color: #b8b7ad;
    padding: 0.8em;
  }
  
  /* Individual item */
  .bm-item {
    display: inline-block;
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
                    <a id="home" className="menu-item" href="/">Home</a>
                    <a id="about" className="menu-item" href="/about">About</a>
                    <a id="contact" className="menu-item" href="/contact">Contact</a>
                    <a onClick={ this.showSettings } className="menu-item--small" href="">Settings</a>
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