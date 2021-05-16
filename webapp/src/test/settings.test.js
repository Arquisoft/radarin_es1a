import React from "react";
import {render, screen, fireEvent, cleanup, pwgetByText, waitFor}  from "@testing-library/react";
import "globalthis/auto";
import ReactDOM from "react-dom";
import Settings from "../Settings.js";
import {SettingsView} from "../components/layouts/SettingsView";
import AdminSettings from "../components/admin/AdminSettings";
import "@testing-library/jest-dom/extend-expect";
import userEvent from '@testing-library/user-event';


test("settings render properly", async () => {
   render(<Settings />);
   await waitFor(() => {
     var input =  screen.getByPlaceholderText("Current = null");
    expect(input).toBeInTheDocument();
    userEvent.type(input , "32343");
    //expect(screen.getByText("32343")).toBeInTheDocument();
   });
});


test("settings view render properly", async () => {
    render(<SettingsView />);
     
     //expect(getByText("Meal")).toBeInTheDocument();
 });
