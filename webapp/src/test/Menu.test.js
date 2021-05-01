import React from "react";
import {render, screen, fireEvent, cleanup, pwgetByText, waitFor}  from "@testing-library/react";
import "globalthis/auto";
import ReactDOM from "react-dom";
import MenuBar from "../components/layouts/MenuBar";
import {NavigationBar} from "../components/layouts/NavigationBar";
import "@testing-library/jest-dom/extend-expect";
import userEvent from '@testing-library/user-event';
test("MenuBar render properly", async () => {

   render(<MenuBar />);  
   await waitFor(() => {
      expect(screen.getByText("Home")).toBeInTheDocument();
      userEvent.click(screen.getByText('Home'));
      expect(screen.getByText("Profile")).toBeInTheDocument();
      userEvent.click(screen.getByText('Profile'));
      expect(screen.getByText("Friends")).toBeInTheDocument();
      userEvent.click(screen.getByText('Friends'));
      expect(screen.getByText("Settings")).toBeInTheDocument();
      userEvent.click(screen.getByText('Settings'));
      expect(screen.getByText("Logout")).toBeInTheDocument();
      userEvent.click(screen.getByText('Logout'));
   });
});
test("NavigationBar render properly", async () => {

   render(<NavigationBar />);  
   await waitFor(() => {
   });
});
