import React from "react";
import {render, screen, fireEvent, cleanup, pwgetByText, waitFor}  from "@testing-library/react";
import 'globalthis/auto';
import ReactDOM from 'react-dom';
import Map from "../components/map/Map";
import "@testing-library/jest-dom/extend-expect";

test ("check that everything is rendering propertly", async () => {
    //render(<  Map />)
});