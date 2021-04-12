import React, { useRef, useState, useLayoutEffect, Fragment } from "react";
import "./adminSettings.css";

function AdminSettingsPage() {
    const usersRef = useRef(null);
    const [users, setUsers] = useState([]);

    // Function that loads the users, SHOULD CHANGE WHEN HEROKU DEPLOY (?)
    var getRespuesta = async function () {
        var respuesta = await fetch("https://radarines1arestapi.herokuapp.com/api/users/lista");
        var response = await respuesta.json();

        var newUsers = [];
        // eslint-disable-next-line
        response.map((item, index) => {
            var user = { solidId: item.solidId, lat: item.latitud, lng: item.longitud };
            newUsers.push(user);
        });

        setUsers(newUsers);
    };

    // Function that deletes the user with the passed id,  SHOULD CHANGE WHEN HEROKU DEPLOY (?)
    var deleteUser = async function (id) {

        const datos = {
            "solidId": id
        }

        await fetch("https://radarines1arestapi.herokuapp.com/api/users/delete", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(datos)
        });

        //var response = await respuesta.json();
        //console.log("Peticion de borrado :" + response);

        // Reload the ref of userList.
        getRespuesta();
    }

    // LayoutEffect to load the userList.
    useLayoutEffect(() => {

        function addUsers() {
            getRespuesta();
        }

        if (!usersRef.current) { return; }

        addUsers();

    }, [usersRef]);

    return (
        <Fragment>

            <h1>Admin Panel</h1>
            <h2>Some analytics panel or somewhat</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Total users</th>
                    </tr>

                    <tr>
                        <td>{users.length}</td>
                    </tr>
                </tbody>
            </table>

            <Fragment>
                <h2>User List</h2>
                <div ref={usersRef} id="userList" />
                <table>
                    <tbody>
                        <tr>
                            <th>SolidId</th>
                            <th>Lat</th>
                            <th>Lng</th>
                        </tr>
                        {
                            users.map((user, i) =>
                                <tr key={user.solidId + i}>
                                    <td><a href={user.solidId} >{user.solidId}</a></td>
                                    <td>{user.lat}</td>
                                    <td>{user.lng}</td>
                                    <td><button onClick={() => deleteUser(user.solidId)}>Delete</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </Fragment>

        </Fragment >
    );
}

export default AdminSettingsPage;
