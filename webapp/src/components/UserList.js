import React from 'react';
import ListGroup from "react-bootstrap/ListGroup";


class UserList extends React.Component{
    render() {
        return (
            <div className="UserList">
                <h3>List of already registered users</h3>
                <ListGroup>
                    
                </ListGroup>
                
           </div>
        )
    }
}
/** 
const webID= "https://uo247134.solidcommunity.net/profile/card#me"
let MyDataset = await getSolidDataset(webID);
*/


export default UserList;
//{this.props.users.map(function(user, i){
 //return <ListGroup.Item id={i} key={i}>{user.name + ' (' + user.email +')'}</ListGroup.Item>
//})}