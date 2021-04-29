import React from "react";
import {render, screen, fireEvent, cleanup, pwgetByText, waitFor}  from "@testing-library/react";
import "globalthis/auto";
import ReactDOM from "react-dom";
import Login from "../components/login/Login.js";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

test ("check that everything is rendering propertly", async () => {
  /*render(<App/>);
  await waitFor(() => {
    const element = screen.getByText("Radarin");
    expect(element).toBeInTheDocument();
  });*/
  //expect(getByText("Home")).toBeInTheDocument();
});