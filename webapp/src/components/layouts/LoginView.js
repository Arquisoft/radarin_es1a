import React from "react";
import { NavigationBar } from "./NavigationBar";
import Login from "../login/Login";

export const LoginView = (props) => (
   <div>
      <NavigationBar />
      <div className="login">
               <Login/>
      </div>
   </div>
);