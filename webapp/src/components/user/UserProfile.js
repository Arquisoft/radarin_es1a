import React, { useState } from "react";
import { Typography, makeStyles, Grid, Card, Avatar, CardContent, Link, FormControl, FormControlLabel, Radio, RadioGroup, withStyles } from "@material-ui/core";
import { GetUserWebId, GetUserProfileImage } from "./SolidManager";
import DirectionsRunRoundedIcon from '@material-ui/icons/DirectionsRunRounded';
import FastfoodRoundedIcon from '@material-ui/icons/FastfoodRounded';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import DragIndicatorRoundedIcon from '@material-ui/icons/DragIndicatorRounded';
import { Value } from "@solid/react";

const RadioFood = withStyles({
    root: {
      '&$checked': {
        color: "#dfc533",
      },
    },
    checked: {},
  })(props => <Radio color="default" icon={<FastfoodRoundedIcon/>} 
  checkedIcon={<FastfoodRoundedIcon/>} {...props} />);

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

function checkSport(){
    return sessionStorage.getItem("userState")==="deporte";
}

function checkDate(){
    return sessionStorage.getItem("userState")==="cita";
}

function checkEat(){
    return sessionStorage.getItem("userState")==="comer";
}

export default function UserProfile() {
    const classes = useStyles();

    const [url, setUrl] = useState("");
    const [userState, setUserState]= useState(sessionStorage.getItem("userState"));

    GetUserProfileImage().then((path) => {
        setUrl(path);
    });

    const [webId, setWebId] = useState(0);

    GetUserWebId().then((url) => {
        setWebId(url);
    });

    const handleChange = event => {
        setUserState(event.target.value);
    };
    
    sessionStorage.setItem("userState",userState);

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
                                    <Link style={{ color: "#303030" }} target="_blank" href={webId}> Your Solid Account</Link>
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
                                    Tu estado
                                </Typography>

                                <Typography className={classes.name} variant="body1" >
                                <FormControl component="fieldset">
                                        <RadioGroup aria-label="estado" name="estado1" onChange={handleChange}>
                                            <FormControlLabel value="deporte" control={<Radio checked={checkSport()} color="primary" icon={<DirectionsRunRoundedIcon/>} 
                                            checkedIcon={<DirectionsRunRoundedIcon/>} />} label="Deporte"  />
                                            <FormControlLabel value="comer" control={ <RadioFood checked={checkEat()}/> } label="Comer"  />
                                            <FormControlLabel value="cita" control={<Radio checked={checkDate()} icon={<FavoriteRoundedIcon/>} 
                                            checkedIcon={<FavoriteRoundedIcon/>} />} label="Cita"  />
                                            <FormControlLabel value="default" control={<Radio color="default" icon={<DragIndicatorRoundedIcon/>} 
                                            checkedIcon={<DragIndicatorRoundedIcon/>} />} label="Sin especificar"  />
                                        </RadioGroup>
                                </FormControl>
                                </Typography>
                            </Grid>
                    
                        </Grid>
                    </CardContent>
                </Card>
                
            </div>
    );
}