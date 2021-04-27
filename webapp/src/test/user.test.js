import React from "react";
import {render, screen, fireEvent, cleanup, pwgetByText, waitFor}  from "@testing-library/react";
import 'globalthis/auto';
import ReactDOM from 'react-dom';
import Map from "../components/map/Map";
import {GetUserState,GetFriendState } from "../components/user/StateManager.js"

test ("test getUserStarte doesnt crash", async () => {
    GetUserState();
});
