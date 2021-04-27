import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyledSideNav = styled.div`
position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
height: 100%;
width: 75px;     /* Set the width of the sidebar */
z-index: 1;      /* Stay on top of everything */
top: 3.4em;      /* Stay at the top */
background-color: #303030; /* Black */
overflow-x: hidden;     /* Disable horizontal scroll */
padding-top: 10px;
`;

class SideNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePath: "/",
      items: [
        {
          path: "/", /* path is used as id to check which NavItem is active basically */
          name: "Home",
          css: "fa fa-fw fa-map-marker-alt",
          key: 1 /* Key is required, else console throws error. Does this please you Mr. Browser?! */
        },
        {
          path: "/profile",
          name: "Profile",
          css: "fas fa-user",
          key: 2
        },
        {
          path: "/friends",
          name: "FriendsView",
          css: "fas fa-users",
          key: 3
        },
        {
          path: "/about",
          name: "About",
          css: "fa fa-fw fa-user-plus",
          key: 4
        }, {
          path: "/settings",
          name: "Settings",
          css: "fa fa-cogs",
          key: 5
        },
        , {
          path: "/welcome",
          name: "Log out",
          css: "fas fa-sign-out-alt",
          key: 6
        }

      ]
    };
  }
  onItemClick = (path) => {
    this.setState({ activePath: path }); /* Sets activePath which causes rerender which causes CSS to change */
  }
  render() {
    const { items, activePath } = this.state;
    return (
      <StyledSideNav>
        {
          /* items = just array AND map() loops thru that array AND item is param of that loop */
          items.map((item) => {
            /* Return however many NavItems in array to be rendered */
            return (
              <NavItem path={item.path} name={item.name} css={item.css} onItemClick={this.onItemClick} /* Simply passed an entire function to onClick prop */ active={item.path === activePath} key={item.key} />
            );
          })
        }
      </StyledSideNav>
    );
  }
}


const StyledNavItem = styled.div`
  height: 70px;
  width: 75px; /* width must be same size as NavBar to center */
  text-align: center; /* Aligns <a> inside of NavIcon div */
  margin-bottom: 0;   /* Puts space between NavItems */
  a {
    font-size: 2.7em;
    color: ${(props) => props.active ? "white" : "#99DE9F"};
    :hover {
      opacity: 0.7;
      &:hover { color: #FFC3A2; }
      text-decoration: none; /* Gets rid of underlining of icons */
    }  
  }
`;
const NavIcon = styled.div`
`;
class NavItem extends React.Component {
  handleClick = () => {
    const { path, onItemClick } = this.props;
    onItemClick(path);
  }
  render() {
    const { active } = this.props;
    return (
      <StyledNavItem active={active}>
        <Link to={this.props.path} className={this.props.css} onClick={this.handleClick}>
          <NavIcon></NavIcon>
        </Link>
      </StyledNavItem>
    );
  }
}
export default class Sidebar extends React.Component {
  render() {
    return (
      <SideNav></SideNav>
    );
  }
}