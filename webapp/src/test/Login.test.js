import React from "react";
import {render, screen, fireEvent, cleanup, input, pwgetByText, waitFor}  from "@testing-library/react";
import userevent from "@testing-library/user-event";
import "globalthis/auto";
import ReactDOM from "react-dom";
import Login from "../components/login/Login.js";
import "@testing-library/jest-dom/extend-expect";

test("login render properly", async () => {
      render(<Login />);
        

      var buttons = screen.getAllByRole('button');
      var provider = buttons[0];
      var login = buttons[1];
      userevent.click(provider);
      //Seleccionar Login por SOLID
      var IDProvider = screen.getByText("Select ID Provider");
      userevent.click(IDProvider);
      var solidcommunity = screen.getByText("Solid Community");
      expect(solidcommunity).toBeInTheDocument();
      userevent.click(solidcommunity);
      userevent.click(login);
      
      /*
      await waitFor( () =>{
        userevent.click(login);
        console.log("prueba");
        var username = screen.getByText("username");
        expect(username).notToBeInTheDocument();

      });
      */


      

      /*
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

       input = screen.getByPlaceholderText("react-4353453-menu-btn");
       expect(input).toBeInTheDocument();
       */
  

  

});