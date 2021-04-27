import React from "react";
import {render, screen, fireEvent, cleanup, pwgetByText, waitFor}  from "@testing-library/react";
import 'globalthis/auto';
import ReactDOM from 'react-dom';
import Welcome from "../components/menus/Welcome";
import "@testing-library/jest-dom/extend-expect";

test("MenuBar render properly", async () => {

   render(<Welcome />);  

});