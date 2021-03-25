import React, { useEffect, useState } from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import { GetUserFriends} from './FriendManager.js';

function UserList() {
 
        var friendList = GetUserFriends();
        var friends = ["Mario", "Luigi", "Waluigi"];
        console.log("USUARIOS:");
        console.log(friendList);
        
        //recorrer usarios para mostrarlos
        return (
            <div className="UserList">
                <h3>List of already registered users</h3>
                <b>GetUserFriends[0].getName</b>
           </div>
        )
    }

/** 
const webID= "https://uo247134.solidcommunity.net/profile/card#me"
let MyDataset = await getSolidDataset(webID);
*/


export default UserList;
