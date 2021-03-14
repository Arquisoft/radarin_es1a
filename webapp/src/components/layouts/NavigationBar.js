import React from 'react';
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap';
import { LoggedIn, LoggedOut } from '@solid/react';
import auth from 'solid-auth-client';
import styled from 'styled-components';
const Styles = styled.div`
  .navbar { background-color: #222; }
  a, .navbar-nav, .navbar-light .nav-link {
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .navbar-brand {
    font-size: 1.4em;
    color: #9FFFCB;
    &:hover { color: white; }
  }
  .form-center {
    position: absolute !important;
    left: 25%;
    right: 25%;
  }
`;
export const NavigationBar = () => (
  <Styles>
    <LoggedIn>
    <Navbar expand="lg">
      <Navbar.Brand href="/">Radarin Es1A</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Form className="form-center">
        <FormControl type="text" placeholder="Search" className="" />
      </Form>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/login" onSelect={() => auth.logout()}> Logout </Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </LoggedIn>
    <LoggedOut>
    <Navbar expand="lg">
      <Navbar.Brand href="/">Radarin Es1A</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"/>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item><Nav.Link href="/">Home</Nav.Link></Nav.Item> 
          <Nav.Item><Nav.Link href="/about">About</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link href="/login">Login</Nav.Link></Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </LoggedOut>
    
  </Styles>
)