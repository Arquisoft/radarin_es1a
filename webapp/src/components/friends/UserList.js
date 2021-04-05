import cache from "./UserCache";

function UserList() {
 
        console.log("INICIO:");
        cache.loadFriends();
        console.log(cache.getFriends());


        
        //recorrer usarios para mostrarlos
        return (
            <div className="UserList">
                <h3>Amigos</h3>
                
           </div>
        )
    }

/** 
const webID= "https://uo247134.solidcommunity.net/profile/card#me"
let MyDataset = await getSolidDataset(webID);
*/


export default UserList;
