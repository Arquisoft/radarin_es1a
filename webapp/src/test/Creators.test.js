import React from "react";
import {render, screen, fireEvent, cleanup, pwgetByText, waitFor}  from "@testing-library/react";
import "globalthis/auto";
import ReactDOM from "react-dom";
import Creators from "../components/menus/Creators";
import "@testing-library/jest-dom/extend-expect";
import userEvent from '@testing-library/user-event';

test("MenuBar render properly", async () => {

   render(<Creators />);  
   await waitFor(() => {
      expect(screen.getByText("Group Github")).toBeInTheDocument();
      userEvent.click(screen.getByText('Group Github'));
      expect(screen.getByText("Subject Github")).toBeInTheDocument();
      userEvent.click(screen.getByText('Subject Github'));
   });
});