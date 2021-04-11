import React, { useState } from "react";
import { Typography, makeStyles, Grid, Card, Avatar, CardContent, Link } from "@material-ui/core";
import { GetUserWebId, GetUserProfileImage } from "../friends/FriendManager";
import { Value } from "@solid/react";


const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
    //    backgroundColor: "#99DE9F"
    },
    card: {
        marginTop: theme.spacing(5),
    },
    photo: {
        width: theme.spacing(23),
        height: theme.spacing(23),
        margin: theme.spacing(3),
    },
    image: {
        width: theme.spacing(100),
        height: theme.spacing(23),
        margin: theme.spacing(3),
    },
    name: {
        margin: theme.spacing(5),
    },
    webid: {
        textAlign: "center",
    }
}));

export default function UserProfile() {
    const classes = useStyles();

    const [url, setUrl] = useState("");

    GetUserProfileImage().then((path) => {
        setUrl(path);
    });

    const [webId, setWebId] = useState(0);

    GetUserWebId().then((url) => {
        setWebId(url);
    });

    return (
            <div className={classes.root}>
                 <Card
                    className={classes.card}
                    variant="outlined"
                >
                    <CardContent>
                        <Grid container>
                            <Grid item>
                                <Avatar alt="Profile photo" src={url} className={classes.photo} />
                            </Grid>

                            <Grid item >
                                <Typography className={classes.name} variant="h3" >
                                    <Value src="user.name" />
                                </Typography>

                                <Typography className={classes.webid} variant="h5" >
                                    <Link style={{ color: "#303030" }} target="_blank" href={webId}> Your Solid account</Link>
                                </Typography>
                            </Grid>                    
                        </Grid>
                    </CardContent>
                </Card>

                <Card
                    className={classes.card}
                    variant="outlined"
                >
                    <CardContent>
                        <Grid container>
                            <Grid item >
                                <Typography className={classes.name} variant="h3" >
                                    Your last locations:
                                </Typography>

                                <Typography className={classes.name} variant="body1" >
                                   Here the locations
                                   Here the locations
                                </Typography>
                            </Grid>
                    
                        </Grid>
                    </CardContent>
                </Card>
                
            </div>
    );
}