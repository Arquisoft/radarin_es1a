import React from "react";
import {render, screen, fireEvent, cleanup, pwgetByText, waitFor}  from "@testing-library/react";
import "globalthis/auto";
import ReactDOM from "react-dom";
import "@testing-library/jest-dom/extend-expect";
import Admin from "../components/admin/AdminSettings";
import userEvent from '@testing-library/user-event';
test ("check that everything is rendering propertly", async () => {
   render(<Admin/>)
  await waitFor(() => {
    expect(screen.getByText("Admin Panel")).toBeInTheDocument();
    expect(screen.getByText("User List")).toBeInTheDocument();
    expect(screen.getByText("Total users")).toBeInTheDocument();
    expect(screen.getByText("Online users")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
    userEvent.click(screen.getByRole("checkbox"))
    expect(screen.getByRole("checkbox")).toBeChecked()
    expect(screen.getByText("User")).toBeInTheDocument();
    expect(screen.getByText("Latitude")).toBeInTheDocument();
    
    //Columnas no encontradas
    //expect(screen.getByText("Longitude")).toBeInTheDocument();
    //expect(screen.getByText("User State")).toBeInTheDocument();
    //expect(screen.getByText("Last Update")).toBeInTheDocument();
    //expect(screen.get("isOnline")).toBeInTheDocument();
    
    expect(screen.getByText("Delete")).toBeInTheDocument();
    userEvent.click(screen.getByText('Delete'))
  });
});