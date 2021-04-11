import React from "react";
import { Nav, Navbar, Form, FormControl } from "react-bootstrap";
import auth from "solid-auth-client";
import styled from "styled-components";
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
    &:hover { color: #99DE9F; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;
export const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">Radarin</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Form className="form-center">
        <FormControl type="text" placeholder="Search" className="" />
      </Form>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item key="home"><Nav.Link href="/">Home</Nav.Link></Nav.Item> 
          <Nav.Item key="about"><Nav.Link href="/about">About</Nav.Link></Nav.Item>
          <Nav.Item key="logout"><Nav.Link href="/login" onSelect={() => auth.logout()}> Logout </Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>    
  </Styles>
);