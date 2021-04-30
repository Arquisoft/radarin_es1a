import React from "react";
import {render, screen, fireEvent, cleanup, pwgetByText, waitFor}  from "@testing-library/react";
import "globalthis/auto";
import ReactDOM from "react-dom";
import ProfileView from "../components/layouts/ProfileView";
import UserProfile from "../components/user/UserProfile";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";

test("user can view its profile", async () => {
   render(<UserProfile />);
    
    //expect(getByText("Meal")).toBeInTheDocument();
    await waitFor(() => {
        const element = screen.getByText("Meal");
        expect(element).toBeInTheDocument();
        const element1 = screen.getByText("Sport");
        expect(element1).toBeInTheDocument();
        const element2 = screen.getByText("Date");
        expect(element2).toBeInTheDocument();
        const element3 = screen.getByText("Unspecified");
        expect(element3).toBeInTheDocument();
    });


});