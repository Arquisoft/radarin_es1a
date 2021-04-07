import React, { useEffect, useState } from "react";
import { Typography, makeStyles, Grid, Card, Avatar, CardContent, Link, CardHeader } from "@material-ui/core";
import cache from "./UserCache";
import { GetUserWebId } from "./FriendManager";

export default function ProfileFriends() {
    return (
            <div>
                <h3>Your friends</h3>
                <FriendCardList />
            </div>
    );
}

function FriendCardList() {

    const [webId, setWebId] = useState("")
    const [friendsList, setFriendsList] = useState([]);

    useEffect(() => {      
        setWebId(GetUserWebId());
        setFriendsList(cache.getFriends());
    }, []);

    const classes = useStyles();
    if (!friendsList.length) {
        return (
            <div className={classes.friendsList}>
                <h4>You dont have friends</h4>
                <h4>You can add new friends in your <Link style={{ color: "#7c4dff" }} target="_blank" href={webId}>Solid profile</Link></h4>
            </div>
        );
    }

    return (
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
    );
}

function FriendCard(props) {
    const classes = useStyles();

    const { friend } = props;

    var photo = friend.getPhoto();
    var name = friend.getName();
    //var webid = friend.getWebId(); De momento no lo utilizamos

    return (
        <Card variant="outlined" className={classes.fCard}>
            <CardHeader
                avatar={
                    <Avatar src={photo} className={classes.fPhoto} />
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
