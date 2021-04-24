import React from "react";
import { Navbar, Form } from "react-bootstrap";
import styled from "styled-components";
const Styles = styled.div`
  .navbar { background-color: #303030; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #99DE9F;
    &:hover { color: #FFC3A2; }
    overflow: hidden;
  }
  .navbar-brand {
    font-size: 1.6em;
    font-family: "SF Pro Display","SF Pro Icons","Helvetica Neue","Helvetica","Arial",sans-serif;
    color: #99DE9F;
    &:hover { color: #99DE9F; }
  }
  #basic-navbar-nav{
    left: 15%;
    right: 10%;
    padding: 2.2%;
    height:48px;
  }
  .form-center {
    position: absolute !important;
    left: 35%;
    right: 50%;
  }
`;

//Comentado, luego podría utilizarse
export const NavigationBar = () => (
  
  <Styles>
    <Navbar expand="lg">
      <Form class= "d-none d-m-up" className="form-center">
        {/* <FormControl type="text" placeholder="Search" className="" /> */}
      </Form>
      <Navbar id="basic-navbar-nav">
        {/* <Nav className="ml-auto">
          { <Nav.Item key="home"><Nav.Link href="/">Home</Nav.Link></Nav.Item> 
          <Nav.Item key="about"><Nav.Link href="/about">About</Nav.Link></Nav.Item>
          <Nav.Item key="logout"><Nav.Link href="/logging" onSelect={() => auth.logout()}> Logout </Nav.Link></Nav.Item> }
        </Nav> */}
      </Navbar>

    </Navbar>    
  </Styles>
);