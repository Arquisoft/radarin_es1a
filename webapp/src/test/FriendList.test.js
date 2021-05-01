import React from "react";
import {render, screen, fireEvent, cleanup, pwgetByText, waitFor}  from "@testing-library/react";
import "globalthis/auto";
import ReactDOM from "react-dom";
import FriendList from "../components/friends/FriendList";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import { GetUserWebId, useGetUserFriends } from "../components/user/SolidManager";

test("check that the list renders properly without any friends", async () => {
   const friendList = render(<FriendList/>)
   await  waitFor(() => {
      //Los tests de render solo tienen en cuenta la pagina estando vacia de contenido
      //No se carga ningun amigo de la Base de datos
      expect(friendList.container).toHaveTextContent("You don't have friends in your Solid Pod");
      expect(friendList.container).toHaveTextContent("You can add new friends in your pod");
      
   });
});
