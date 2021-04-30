import React, { useState } from "react";
import cx from "clsx";
import { Card, Avatar, CardContent, Link, FormControl, Switch, 
     FormControlLabel, Radio, RadioGroup, Divider,withStyles } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GetUserWebId, GetUserProfileImage } from "./SolidManager";
import DirectionsRunRoundedIcon from "@material-ui/icons/DirectionsRunRounded";
import FastfoodRoundedIcon from "@material-ui/icons/FastfoodRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import DragIndicatorRoundedIcon from "@material-ui/icons/DragIndicatorRounded";
import { useFadedShadowStyles } from "@mui-treasury/styles/shadow/faded";
import { Value } from "@solid/react";

const RadioFood = withStyles({
    root: {
      "&$checked": {
        color: "#dfc533",
      },
    },
    checked: {},
  })(props => <Radio color="default" icon={<FastfoodRoundedIcon/>} 
  checkedIcon={<FastfoodRoundedIcon/>} {...props} />);

  const RadioDefault = withStyles({
    root: {
      "&$checked": {
        color: "#000000",
      },
    },
    checked: {},
  })(props => <Radio color="default" icon={<DragIndicatorRoundedIcon/>} 
  checkedIcon={<DragIndicatorRoundedIcon/>} {...props} />);

const useStyles = makeStyles((palette) => ({
    card: {
        borderRadius: 12,
        minWidth: 256,
        textAlign: "center",
      },
      avatar: {
        width: 80,
        height: 80,
        margin: "auto",
      },
      imagen: {
          height: '15rem',
          width: '15rem',
          marginTop: -50
      },
      covid: {
          marginTop: 10
      },
      heading: {
        fontSize: 18,
        fontWeight: "bold",
        letterSpacing: "0.5px",
        marginTop: 8,
        marginBottom: 0,
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
function checkDefault(){
    return sessionStorage.getItem("userState")==="default";
}
function checkCovid(){
    return sessionStorage.getItem("userState")==="covid";
}

export default function UserProfile() {
    

    const [url, setUrl] = useState("");
    // eslint-disable-next-line
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
        sessionStorage.setItem("userState", event.target.value);
        enviarUbicacionAServidor();
    };

    const handleCovidChange = event => {
      if(sessionStorage.getItem("userState")==="covid"){
        setUserState("default");
        sessionStorage.setItem("userState", "default");
        enviarUbicacionAServidor();
      }else{ 
        setUserState(event.target.value);
        sessionStorage.setItem("userState", event.target.value);
        enviarUbicacionAServidor();
      }
    };

    const omsUrl="https://www.who.int/emergencies/diseases/novel-coronavirus-2019";
    const omsLogo="https://www.who.int/ResourcePackages/WHO/assets/dist/images/logos/en/h-logo-blue.svg"

    function enviarUbicacionAServidor() {
        if (webId) {
            navigator.geolocation.getCurrentPosition((position) => {

                const datos = {
                    "solidId": webId,
                    "posicion": {
                        "latitud": position.coords.latitude,
                        "longitud": position.coords.longitude,
                    },
                    "userState": sessionStorage.getItem("userState")
                };

                //Cambia cuando este subido a heroku
                fetch("https://radarines1arestapi.herokuapp.com/api/users/location", { // http://localhost:5000/api/users/location
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(datos)
                });
            });
        }
    }

    const classes = useStyles();
    const shadowStyles = useFadedShadowStyles();

    return (
        <div>
            <Card className={cx(classes.card, shadowStyles.root)}>
                <CardContent>
                  <Avatar className={classes.avatar} src={url} />
                  <h3 className={classes.heading}><Value src="user.name" /> </h3>
                  <Link style={{ color: "#303030" }} target="_blank" href={webId}> Account</Link>
                </CardContent>
                <Divider light />
            </Card>
              <Card className={classes.card} variant="outlined">
                <CardContent>
                  <h3 className={classes.heading}>State:</h3>
                  <br/>
                  <FormControl component="fieldset" disabled={checkCovid()}>
                    <RadioGroup aria-label="estado" name="estado1"  onChange={handleChange} >
                        <FormControlLabel value="deporte" control={<Radio checked={checkSport()} color="primary" icon={<DirectionsRunRoundedIcon/>} 
                        checkedIcon={<DirectionsRunRoundedIcon/>} />} label="Sport"  />
                        <FormControlLabel value="comer" control={ <RadioFood checked={checkEat()}/> } label="Meal"  />
                        <FormControlLabel value="cita" control={<Radio checked={checkDate()} icon={<FavoriteRoundedIcon/>} 
                        checkedIcon={<FavoriteRoundedIcon/>} />} label="Date"  />
                        <FormControlLabel value="default" control={<RadioDefault checked={checkDefault()} />} label="Unspecified"  />
                    </RadioGroup>
                  </FormControl>
                    </CardContent>
              </Card>
              <Card className={classes.card} variant="outlined">
                <CardContent>                 
                  <h3 className={classes.heading}>Do you have any covid symptoms?</h3>
                  <h4 className={classes.heading}><Link style={{ color: "#99DE9F" }} target="_blank" href={omsUrl}> Check it</Link> </h4>
                 <FormControlLabel  value="covid"  className={classes.covid} 
                    control={<Switch checked={checkCovid()} onChange={handleCovidChange}  color="primary" />}
                    label="I have Covid-19"
                  />
                  <br/>
                  <img alt="Logo OMS" src={omsLogo} className={classes.imagen}/>
                  </CardContent>
              </Card>
        </div>
    );
}