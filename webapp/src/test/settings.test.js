import React from "react";
import {render, screen, fireEvent, cleanup, pwgetByText, waitFor}  from "@testing-library/react";
import "globalthis/auto";
import ReactDOM from "react-dom";
import Settings from "../Settings.js";
import "@testing-library/jest-dom/extend-expect";

test("settings render properly", async () => {
   render(<Settings />);
    
    //expect(getByText("Meal")).toBeInTheDocument();
    


});