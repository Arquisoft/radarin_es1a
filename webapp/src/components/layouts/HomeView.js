import Sidebar from "./Sidebar";
import Menubar from "./MenuBar";
import { NavigationBar } from "./NavigationBar";
import React from "react";

export const HomeView = () => {
    return (
        <React.Fragment>
            <NavigationBar />
            <Menubar/>
        </React.Fragment>
    );
};
