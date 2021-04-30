import React, { useRef, useState, useLayoutEffect, Fragment } from "react";
import { Card, CardContent, Button, TableRow, Box } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import "./adminSettings.css";

function AdminSettingsPage() {
    const usersRef = useRef(null);
    const [rows, setRows] = useState([]);
    const [selectionModel, setSelectionModel] = React.useState([]);

    const columns = [
        { field: "id", headerName: "User", width: 400 },
        { field: "lat", headerName: "Latitude", width: 150 },
        { field: "lng", headerName: "Longitude", width: 150 },
        { field: "userState", headerName: "User State", width: 150 },
        { field: "lastLogin", headerName: "Last Update", width: 250 },
        { field: "isOnline", headerName: "isOnline", width: 150 },

    ];

    var onlineUsers = 0;
    const timeLimit = 30000;
    function incrementOnlineUsers() {
        onlineUsers++;
    }
    function getOnlineUsers() {
        return onlineUsers;
    }
    // Function that loads the users, SHOULD CHANGE WHEN HEROKU DEPLOY (?)
    var getRespuesta = async function () {
        var respuesta = await fetch("https://radarines1arestapi.herokuapp.com/api/users/lista");
        var response = await respuesta.json();

        var newUsers = [];
        // eslint-disable-next-line
        response.map((item, index) => {
            let online = false;
            let time = new Date();
            //Si el usuario subio su posicion en los ultimos 30 segundos se considera online.
            if (item.timeStamp != null && (time.getTime() - item.timeStamp < timeLimit)) {
                online = true;
            }

            var user = { id: item.solidId, lat: item.latitud, lng: item.longitud, userState: item.userState, lastLogin:new Date(item.timeStamp).toUTCString(), isOnline: online, timeStamp: item.timeStamp };
            //newUsers.push(user);
            newUsers.push(user);
        });

        setRows(newUsers);

    };

    // Function that deletes the user with the passed id,  SHOULD CHANGE WHEN HEROKU DEPLOY (?)
    var deleteUser = async function (users) {

        users.map(async (user) => {
            const datos = {
                "solidId": user
            };

            await fetch("https://radarines1arestapi.herokuapp.com/api/users/delete", {
                method: "post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(datos)
            });
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
            <Card>
                <CardContent>
                    <h1>Admin Panel</h1>
                    <TableRow>
                        <thead>
                            <tr>
                                <th>Total users</th>
                                <th>Online users</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{rows.length}</td>
                                <td>
                                    {
                                        rows.map((user) => {
                                            let time = new Date();
                                            //Si el usuario subio su posicion en los ultimos 30 segundos se considera online.
                                            if (time.getTime() - user.timeStamp < timeLimit) {
                                                incrementOnlineUsers();
                                            }
                                            return null;
                                        })
                                    }
                                    {
                                        getOnlineUsers()
                                    }
                                </td>
                            </tr>
                        </tbody>
                    </TableRow>
                </CardContent>
                <Fragment>
                    <Card>
                        <CardContent >
                            <h2>User List</h2>
                            <div ref={usersRef} id="userList" />
                            <Box height="24em">
                                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection

                                    onSelectionModelChange={(newSelection) => {
                                        setSelectionModel(newSelection.selectionModel);
                                    }}

                                    selectionModel={selectionModel} />
                            </Box>
                            <Button onClick={() => deleteUser(selectionModel)}>Delete</Button>

                        </CardContent>
                    </Card>
                </Fragment>
            </Card>
        </Fragment >
    );
}

export default AdminSettingsPage;
