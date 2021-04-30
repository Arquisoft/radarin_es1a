import React from "react";
import { slide as Menu } from "react-burger-menu";
import styled from "styled-components";
import auth from "solid-auth-client";
import Nav from "react-bootstrap/Nav";


const Styles = styled.div`
.bm-burger-button {
    position: absolute;
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
  .nav-link{
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

    constructor(props) {
        super(props)

        this.state = {
            menuOpen: false
        }

        this.handleStateChange=this.handleStateChange.bind(this);
        this.handleLinkClick=this.handleLinkClick.bind(this);
    }

    handleStateChange(state) {
        this.setState({menuOpen:state.isOpen})
    }

    handleLinkClick(e) {
        this.setState({menuOpen:false})
    }

    showSettings (event) {
        event.preventDefault();
    }

  render () {
    // NOTE: You also need to provide styles, see https://github.com/negomi/react-burger-menu#styling
        return (
            <Styles>              
                <Menu onStateChange={this.handleStateChange}  isOpen={ this.state.menuOpen }>
                  
                    <li className= "nav-item">
                      <i className="fa fa-fw fa-map-marker-alt" ></i>
                      <Nav.Link href="/" className="nav-link">Home</Nav.Link>
                    </li>
                    <li className= "nav-item">
                      <i className="fas fa-user"></i>
                      <Nav.Link href="/profile" className="nav-link">Profile</Nav.Link>
                    </li>
                    <li className= "nav-item">
                      <i className="fas fa-users"></i>
                      <Nav.Link href="/friends" className="nav-link">Friends</Nav.Link>
                    </li>
                    <li className= "nav-item">
                      <i className="fa fa-cogs"></i>
                      <Nav.Link href="/settings" className="nav-link">Settings</Nav.Link>
                    </li>
                    <li className= "nav-item">
                      <i className="fas fa-sign-out-alt"></i>
                        <Nav.Link href="/welcome" className="nav-link" onClick={()=>{
                            this.handleLinkClick();
                            auth.logout();
                            window.sessionStorage.clear();
                            window.location.href = "/welcome";
                        }}> Logout</Nav.Link>
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