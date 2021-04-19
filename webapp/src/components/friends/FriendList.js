import React, { useEffect, useState } from "react";
import { Typography, makeStyles, Grid, Card, Avatar, CardContent, Link, CardHeader, IconButton } from "@material-ui/core";
import { GetUserWebId, useGetUserFriends } from "../user/SolidManager";
import NotListedLocationIcon from '@material-ui/icons/NotListedLocation';

export default function ProfileFriends() {
    return (
        <div>
            <FriendCardList />
        </div>
    );
}

function FriendCardList() {

    const [webId, setWebId] = useState("");
    const friendsList = useGetUserFriends();
    console.log(friendsList);
    useEffect(() => {
        setWebId(GetUserWebId());
    }, []);

    const classes = useStyles();
    if (!friendsList.length) {
        return (
            <div className={classes.friendsList}>
                <h4>You don't have friends in your Solid Pod</h4>
                <h4>You can add new friends in your <Link style={{ color: "#7c4dff" }} target="_blank" href={webId}>Solid profile</Link></h4>
            </div>
        );
    }

    return (
        <div className={classes.root}>

            <Grid container>
                <Grid item >
                    <Typography className={classes.name} variant="h3" >
                        Your friends
                    </Typography>
                </Grid>
            </Grid>

            <Grid
                container
                spacing={3}
                alignItems="center"
                justify="center"
                className={classes.friends}
            >
                {friendsList.map((each, index) => {
                    return (
                        <Grid item key={index}>
                            <FriendCard friend={each} />
                        </Grid>
                    )
                })}
            </Grid>
        </div>
    );
}

function FriendCard(props) {
    const classes = useStyles();

    const { friend } = props;

    var photo = friend.getPhoto();
    var name = friend.getName();
    var webid = friend.getWebId();
    var nombre = webid.substring(
        webid.lastIndexOf("//") + 1,
        webid.lastIndexOf(".")
    )
    var n = nombre.substring(
        nombre.lastIndexOf("/") + 1,
        nombre.lastIndexOf(".")
    )
    n += "*";


    return (
        <Card variant="outlined" className={classes.fCard}>
            <CardHeader
                avatar={
                    <Avatar src={photo} className={classes.fPhoto} />
                }
                action={
                    <IconButton style={{ color: "#99DE9F" }} aria-label="go to map" onClick={window.sessionStorage.setItem('visitado', 'false')} href={`https://radarines1awebapp.herokuapp.com/map/${n}`}>
                        <NotListedLocationIcon />
                    </IconButton>
                }
            />
            <CardContent style={{ textAlign: "center" }}>
                <Typography variant="h6" color="textSecondary" component="p">
                    {name}
                </Typography>
            </CardContent>
        </Card>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
    },
    main: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(2),
    },
    paper: {
        borderBottom: "1px solid #e8e8e8",
        marginTop: theme.spacing(2),
        backgroundColor: "#99de9f",
        width: "100%"
    },
    friends: {
        marginTop: theme.spacing(5),
    },
    fPhoto: {
        width: theme.spacing(13),
        height: theme.spacing(13),
        marginLeft: "3rem",
        marginTop: "1rem"
    },
    fCard: {
        display: "block",
        width: "15rem",
        height: theme.spacing(30)
    },
    friendsList: {
        textAlign: "center",
        marginTop: theme.spacing(7),
        marginBottom: theme.spacing(50)
    }
}));
