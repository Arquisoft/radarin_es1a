import Sidebar from "./Sidebar";
import { NavigationBar } from "./NavigationBar";
import React from "react";

export const HomeView = () => {
    return (
        <React.Fragment>
            <NavigationBar />
            <Sidebar />
        </React.Fragment>
    );
};
