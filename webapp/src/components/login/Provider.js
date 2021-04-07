import logoInrupt from "../img/providers/inrupt.svg";
import logoSolid from "../img/providers/solidcommunity.png";

type ProviderEntity = {
    label: String,
    image: String,
    value: String,
    registerLink: String,
    description: String,
};

export default class Provider {
    /*
     *  Function to get providers. This is to mimic the future provider registry
     */
    static getIdentityProviders(): Array<ProviderEntity> {
        return [
            {
                id: "inrupt",
                label: "Inrupt",
                image: logoInrupt,
                value: "https://inrupt.net/auth",
                registerLink: "https://inrupt.net/register",
                description: "Lorem ipsum dolor sit amet non ipsom dolor",
            },
            {
                id: "solid-community",
                label: "Solid Community",
                image: logoSolid,
                value: "https://solidcommunity.net",
                registerLink: "https://solidcommunity.net/register",
                description: "Lorem ipsum dolor sit non consectetur",
            }
        ];
    }
}