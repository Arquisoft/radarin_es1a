import React from "react";
import {render, screen, fireEvent, cleanup, input, pwgetByText, waitFor}  from "@testing-library/react";
import userevent from "@testing-library/user-event";
import "globalthis/auto";
import ReactDOM from "react-dom";
import Login from "../components/login/Login.js";
import "@testing-library/jest-dom/extend-expect";

test("login render properly", async () => {
   render(<Login />);

   
   await waitFor(() => {
      var input =  screen.getByPlaceholderText("Enter the url of your webId");
      expect(input).toBeInTheDocument();
      //userevent.type(input , "https://tasorodri.solidcommunity.net/");
      userevent.type(input , "tasorodri.solidcommunity.net");
      expect(input).toHaveValue("tasorodri.solidcommunity.net");
      var buttons = screen.getAllByRole('button');
      var submit = buttons[1];
      
      //userevent.click(submit);
  });

  await waitFor(() => {

   //fireEvent.change(input, {target : {value: 'Hello' } })
/*
   var component = screen.getByText("hola que tal");
   var component = screen.getByText("prueba");
   expect(component).toBeInTheDocument();*/

  })

});