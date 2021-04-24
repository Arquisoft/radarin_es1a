/*import { render } from '@testing-library/react';
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import ProfileView from "../components/layouts/ProfileView";
import { BrowserRouter } from 'react-router-dom';*/

import React from "react";
import {render, fireEvent, cleanup, pwgetByText}  from "@testing-library/react";
import 'globalthis/auto';
import ReactDOM from 'react-dom';
import ProfileView from "../components/layouts/ProfileView";


test("user can view its profile", async () => {
/*
    const { getAllByRole, getByPla ceholderText } = render(<BrowserRouter><Provider store={store}><LoginPage/></Provider></BrowserRouter>);

    const providerTextField = getByPlaceholderText(correctProvider);

    expect(providerTextField).toBeInTheDocument();
    
    fireEvent.change(providerTextField, {target: { value: correctProvider }});

    const signInButton = getAllByRole("button", { name: "Sign In" }).find(element => element.className.includes("MuiButton"));

    expect(signInButton).toBeInTheDocument();*/
});