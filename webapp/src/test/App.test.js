import React from "react";
import {render, screen, fireEvent, cleanup, pwgetByText, waitFor, getByAltText}  from "@testing-library/react";
import "globalthis/auto";
import ReactDOM from "react-dom";
import Login from "../components/login/Login.js";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

test ("check that everything is rendering propertly", async () => {
  const app = render(<App/>);
  
  await waitFor(() => {  
    expect(app.container).toHaveTextContent("Radarin");
    expect(app.container).toHaveTextContent("Watch the trailer");
    expect(app.container).toHaveTextContent("University of Oviedo - Software Architecture");
    expect(screen.getByAltText("radarin")).toBeInTheDocument();
    expect(screen.getByAltText("functionalities")).toBeInTheDocument();
    expect(screen.getByAltText("meeting")).toBeInTheDocument();
    expect(screen.getByAltText("usability")).toBeInTheDocument();
    expect(screen.getByAltText("principal")).toBeInTheDocument();
 
  });
});
