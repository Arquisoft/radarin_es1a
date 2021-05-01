import React from "react";
import {render, screen, fireEvent, cleanup, pwgetByText, waitFor}  from "@testing-library/react";
import "globalthis/auto";
import ReactDOM from "react-dom";
import Map from "../components/map/Map";
import {GetUserState,GetFriendState } from "../components/user/StateManager.js"
import  UserCache from  "../components/friends/UserCache"
import {GetSpecificName,GetSpecificProfileImage,GetUserFriends , GetUserWebId} from "../components/user/SolidManager.js"

test ("test getUserStarte doesnt crash", async () => {
    GetUserState();
    
});

test ("test getUserStarte doesnt crash", async () => {
    var name =  GetSpecificName("https://tasorodri.solidcommunity.net/profile/card#me");
    var photo = GetSpecificProfileImage("https://tasorodri.solidcommunity.net/profile/card#me");
    GetUserFriends();
    GetUserWebId();
    //var photo = GetSpecificProfileImage("https://tasorodri.solidcommunity.net/profile/card#me");
    //var photo = GetSpecificProfileImage("https://tasorodri.solidcommunity.net/profile/card#me");
});

test ( "usercache test", async () => {
    UserCache.clearFriends();
    UserCache.getFriends();
    UserCache.getName();
    UserCache.getWebId();
    UserCache.loadFriends();

});


