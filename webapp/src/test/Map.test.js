import React from "react";
import {render, screen, fireEvent, cleanup, pwgetByText, waitFor}  from "@testing-library/react";
import "globalthis/auto";
import ReactDOM from "react-dom";
import Map from "../components/map/Map";
import {toRadianes, distanceFilter, radius} from "../components/map/LocationFunctions";
import { MapMarker } from "../components/map/MapMarker";
import "@testing-library/jest-dom/extend-expect";

test ("check that Map is rendering propertly", async () => {
    //const map = render(<  MapMarker />);
    // waitFor(() => {
        
  //    });
});
/**
test ("check that MapMarker is rendering propertly", async () => {
    render(<  MapMarker />);
    await waitFor(() => {
        
      });
});
 
test ("check that locationFunctions work properly", async () => {
    var assert = require('assert');
    console.log("Patata")
    var radio  = radius();    //5 por defecto
    assert.equal(radio, 5);
    var rad = toRadianes(180);
    assert.equal(rad, Math.PI);
    var user = {latitud : 0, longitud : 0};
    console.log(distanceFilter(30, 30, user));
    console.log(distanceFilter(0.001, 0.0001, user));
    user.latitud;
    var lng1 = user.longitud;
    assert.equal(distanceFilter(30, 30, user), false);  //fuera del radio
    assert.equal(distanceFilter(0.01, 0.01, user), true);   //dentro del radio
    
});
*/