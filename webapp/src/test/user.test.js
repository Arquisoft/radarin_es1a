import React from "react";
import {render, screen, fireEvent, cleanup, pwgetByText, waitFor}  from "@testing-library/react";
import "globalthis/auto";
import ReactDOM from "react-dom";
import Map from "../components/map/Map";
import {GetUserState,GetFriendState } from "../components/user/StateManager.js"
import {GetSpecificName,GetSpecificProfileImage } from "../components/user/SolidManager.js"

test ("test getUserStarte doesnt crash", async () => {
    GetUserState();
});

test ("test getUserStarte doesnt crash", async () => {
    var name =  GetSpecificName("https://tasorodri.solidcommunity.net/profile/card#me");
    var photo = GetSpecificProfileImage("https://tasorodri.solidcommunity.net/profile/card#me");
});
