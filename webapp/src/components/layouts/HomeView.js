import Sidebar from './Sidebar';
import { NavigationBar } from './NavigationBar';
import { LoggedIn } from '@solid/react';
import React from 'react';

export const HomeView = () => {
    return (
        <React.Fragment>
            <NavigationBar />
            <LoggedIn>
                <Sidebar />
            </LoggedIn>
        </React.Fragment>
    );
}
