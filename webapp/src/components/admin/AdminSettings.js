import React, { useRef, useState, useLayoutEffect, Fragment } from "react";
import "./adminSettings.css";

function AdminSettingsPage() {
    const usersRef = useRef(null);
    const [users, setUsers] = useState([]);

    var getRespuesta = async function () {
        var respuesta = await fetch("http://localhost:5000/api/users/lista");
        var response = await respuesta.json();

        var newUsers = [];
        // eslint-disable-next-line
        response.map((item, index) => {
            var user = { solidId: item.solidId, lat: item.latitud, lng: item.longitud };
            newUsers.push(user);
        });

        setUsers(newUsers);
    }

    useLayoutEffect(() => {

        function addUsers() {
            getRespuesta();
        }

        if (!usersRef.current) { return; }

        addUsers();


    }, [usersRef]);

    return (

        <Fragment>

            <h2>Admin Panel</h2>

            <p>Some analytics panel or somewhat.</p>

            <Fragment>
                <h3>User List</h3>
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
                                    <td><a href={"http://localhost:5000/api/user/delete/" + user.solidId}>Delete</a></td>
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
