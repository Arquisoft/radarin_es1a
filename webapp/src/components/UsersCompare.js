import React, {useCallback, useState, useEffect} from "react";
import Map from "./Map";

function UsersCompare(props){
    const [friends, setFriends] = useState([]);
    var getSolidFriends = useCallback (async function() {
        var respuesta = await fetch("https://radarines1arestapi.herokuapp.com/api/users/lista"); //http://localhost:5000/api/users/lista
        await respuesta.json().then(result => {
            const list = result.filter(user => props.solidFriends.includes(user.solidId));
            console.log(list);
            setFriends(list);
        })
    }, [setFriends, props.solidFriends]);

    useEffect(() => {
        getSolidFriends();
    }, [getSolidFriends]);

    return <Map solidFriends={friends}></Map>
}

export default UsersCompare;