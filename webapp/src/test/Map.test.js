import React from "react";
import {render, screen, fireEvent, cleanup, pwgetByText, waitFor}  from "@testing-library/react";
import 'globalthis/auto';
import ReactDOM from 'react-dom';
import Map from "../components/map/Map";
import { MapMarker } from "../components/map/MapMarker";
import "@testing-library/jest-dom/extend-expect";

test ("check that Map is rendering propertly", async () => {
    //render(<  Map />)
});

test ("check that MapMarker is rendering propertly", async () => {
    let webID = "Https://tasorodri.solidcommunity.net/profile/card#me";
    render(<  MapMarker />);
    await waitFor(() => {
        //const element = screen.getByText("Radarin");
        //expect(element).toBeInTheDocument();
      });
});