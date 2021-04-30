import React from "react";
import {render, screen, fireEvent, cleanup, pwgetByText, waitFor}  from "@testing-library/react";
import "globalthis/auto";
import ReactDOM from "react-dom";
import Friend from "../entities/Friend";
import "@testing-library/jest-dom/extend-expect";
import App from "../App";

test ("ccheck Friend entity works properly", async () => {
  var testFriend = new Friend("webID", "name", "photo");
  expect(testFriend.getWebId()).toBe("webID");
  expect(testFriend.getName()).toBe("name");
  expect(testFriend.getPhoto()).toBe("photo");
  expect(testFriend.toString()).toBe("Usuario: webID con Nombre: name");
  testFriend.toJson();
});