import React from "react";
import {render, screen, fireEvent, cleanup, pwgetByText, waitFor}  from "@testing-library/react";
import 'globalthis/auto';
import ReactDOM from 'react-dom';
import FriendList from "../components/friends/FriendList";
import {FriendCardList} from "../components/friends/FriendList";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router-dom';
import "@testing-library/jest-dom/extend-expect";
import { GetUserWebId, useGetUserFriends } from "../components/user/SolidManager";

test("check that the list renders properly without any friends", async () => {
   
   console.log(GetUserWebId());
   await waitFor(() => {
      console.log(GetUserWebId());
   });
   render(<FriendList />);
    
   //await waitFor(() => {
   //});
});
