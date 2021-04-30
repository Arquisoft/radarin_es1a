import React from "react";
import {render, screen, fireEvent, cleanup, input, pwgetByText, waitFor}  from "@testing-library/react";
import userevent from "@testing-library/user-event";
import "globalthis/auto";
import ReactDOM from "react-dom";
import Login from "../components/login/Login.js";
import "@testing-library/jest-dom/extend-expect";

test("login render properly", async () => {
   render(<Login />);

   
    waitFor(() => {
      var input =  screen.getByPlaceholderText("Enter the url of your webId");
      expect(input).toBeInTheDocument();
      //userevent.type(input , "https://tasorodri.solidcommunity.net/");
      //userevent.type(input , "tasorodri.solidcommunity.net");
      //expect(input).toHaveValue("tasorodri.solidcommunity.net");
      var buttons = screen.getAllByRole('button');
      var submit = buttons[0];
      userevent.click(submit);

      //Seleccionar Login por SOLID
      var IDProvider = screen.getByPlaceholderText("Select ID Provider");
      userevent.click(IDProvider);
      var solidcommunity = screen.getByText("Solid Community");
      expect(solidcommunity).toBeInTheDocument();
      //Confirmar 
      userevent.click(solidcommunity);
       buttons = screen.getAllByRole('button');
       submit = buttons[1];

       //Vista Login de SOlid

       //Rellenar nombre
       input =  screen.getByPlaceholderText("Username");
       expect(input).toBeInTheDocument();
       userevent.type(input , "radarines1atest");
      //Rellenar contraseña
       input =  screen.getByPlaceholderText("Password");
       expect(input).toBeInTheDocument();
       userevent.type(input , "R@darines1atest");

       //Pulsar logear
        buttons = screen.getAllByRole('button');
       submit = buttons[0];
      userevent.click(submit);


      //Comprobar que estamos en la vista del mapa
       input = screen.getByTestId("react-burguer-menu-btn");
       expect(input).toBeInTheDocument();
  });

  await waitFor(() => {

   //fireEvent.change(input, {target : {value: 'Hello' } })

   //var component = screen.getByText("hola que tal");
   //var component = screen.getByText("prueba");
   //sexpect(component).toBeInTheDocument();*

  })

});