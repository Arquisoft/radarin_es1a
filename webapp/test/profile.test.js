import { render } from '@testing-library/react';
import { fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { Provider } from "react-redux";
import UserProfile from "../src/layouts/UserProfile";
import { BrowserRouter } from 'react-router-dom';


test("user can change provider text and click sign in", async () => {
    const correctProvider = "https://inrupt.net";

    const { getAllByRole, getByPlaceholderText } = render(<BrowserRouter><Provider store={store}><LoginPage/></Provider></BrowserRouter>);

    const providerTextField = getByPlaceholderText(correctProvider);

    expect(providerTextField).toBeInTheDocument();
    
    fireEvent.change(providerTextField, {target: { value: correctProvider }});

    const signInButton = getAllByRole("button", { name: "Sign In" }).find(element => element.className.includes("MuiButton"));

    expect(signInButton).toBeInTheDocument();
});