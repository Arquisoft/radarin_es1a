import React, { useEffect, useState } from 'react';
import ListGroup from "react-bootstrap/ListGroup";
import { GetUserFriends} from './FriendManager.js';

function UserList() {
    /** 
    const [
	//users,
	setUsers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/users/list")
            .then((resultado)=>resultado.json())
            .then((users) => setUsers(users));

    }, [setUsers])*/
        var friendList = GetUserFriends;
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
//{this.props.users.map(function(user, i){
 //return <ListGroup.Item id={i} key={i}>{user.name + ' (' + user.email +')'}</ListGroup.Item>
//})}