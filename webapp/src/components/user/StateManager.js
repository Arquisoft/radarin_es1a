import { useEffect, useState } from "react";

export async function GetUserState() {
    try {
        var respuesta = await fetch("https://radarines1arestapi.herokuapp.com/api/users/lista");
        var response = await respuesta.json();
        var id = window.sessionStorage.getItem("id");

        const list = response.filter(user => user.solidId === id);
        const state = list[0].userState;

        return state;
    } catch (TypeError) {
        return null;
    }
}
export function GetFriendState(webid) {
    const [state, setState] = useState("");
    useEffect(() => {
        async function loadState() {
            var respuesta = await fetch("https://radarines1arestapi.herokuapp.com/api/users/lista");
            var response = await respuesta.json();

            const list = response.filter(user => user.solidId === webid);
            if (list[0] != null)
                setState(list[0].userState);
        }
        loadState();
    });

    return state;
}