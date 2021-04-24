import React from "react";
import {render, screen, fireEvent, cleanup, pwgetByText, waitFor}  from "@testing-library/react";
import 'globalthis/auto';
import ReactDOM from 'react-dom';
import FriendList from "../components/friends/FriendList";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import "@testing-library/jest-dom/extend-expect";

test("check that the list of users renders propertly", async () => {
   
   render(<FriendList />);
    
   //await waitFor(() => {
   //});
});