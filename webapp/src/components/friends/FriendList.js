import React, { useEffect, useState } from "react";
import cx from "clsx";
import { makeStyles, Avatar, Divider, Button } from "@material-ui/core";
import { GetUserWebId, useGetUserFriends } from "../user/SolidManager";
import { GetFriendState } from "../user/StateManager";
import NotListedLocationIcon from "@material-ui/icons/NotListedLocation";
import DirectionsRunRoundedIcon from "@material-ui/icons/DirectionsRunRounded";
import FastfoodRoundedIcon from "@material-ui/icons/FastfoodRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import {  Link, BrowserRouter } from "react-router-dom";
import { Column, Row, Item } from "@mui-treasury/components/flex";
import { useDynamicAvatarStyles } from "@mui-treasury/styles/avatar/dynamic";

export default function ProfileFriends() {
  return (
    <div>
      <FriendCardList />
    </div>
  );
}
const usePersonStyles = makeStyles(() => ({
  text: {
    fontFamily: "Barlow, san-serif",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },
  name: {
    fontWeight: 600,
    fontSize: "1rem",
    color: "#122740",
  },
  caption: {
    fontSize: "0.875rem",
    color: "#758392",
    marginTop: -4,
  },
  btn: {
    borderRadius: 20,
    padding: "0.125rem 0.75rem",
    borderColor: "#becddc",
    fontSize: "0.75rem",
  },
}));
const useStyles = makeStyles(() => ({
  card: {
    width: "100%",
    borderRadius: 16,
    boxShadow: "0 8px 16px 0 #BDC9D7",
    overflow: "hidden",
  },
  header: {
    fontFamily: "Barlow, san-serif",
    backgroundColor: "#fff",
  },
  headline: {
    color: "#122740",
    fontSize: "1.25rem",
    fontWeight: 600,
  },
  link: {
    color: "#2281bb",
    padding: "0 0.25rem",
    fontSize: "0.875rem",
  },
  actions: {
    color: "#BDC9D7"
  },
  divider: {
    backgroundColor: "#d9e2ee",
    margin: "0 20px",
  }
}));

function FriendCardList() {
  const [webId, setWebId] = useState("");
  const friendsList = useGetUserFriends();

  useEffect(() => {
    setWebId(GetUserWebId());
  }, []);

  const classes = useStyles();
  if (!friendsList.length) {
    return (
      <div className={classes.header}>
        <Column p={0} gap={0} className={classes.card}>
        <h3>You don"t have friends in your Solid Pod</h3>
        <h4>You can add new friends in your pod 
          <BrowserRouter><Link style={{ color: "#7c4dff" }} target="_blank" href={webId}>Solid profile</Link></BrowserRouter> </h4>  
      </Column>
      </div>
    );
  }

  return (
    <>
      <Column p={0} gap={0} className={classes.card}>
        <Row wrap p={2} alignItems={"baseline"} className={classes.header}>
          <Item stretched className={classes.headline}>Friends</Item>
        </Row>
        {friendsList.map((each, index) => {
          return (
            <>
              <PersonItem friend={each} />
              <Divider variant={"middle"} className={classes.divider} />
            </>
          );
        })}
      </Column>
    </>
  );
}

function PersonItem(props) {
  const avatarStyles = useDynamicAvatarStyles({ size: 56 });
  const styles = usePersonStyles();

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
   
    const state=GetFriendState(webid);

    return (
        <Row gap={2} p={2.5}>
        <Item>
          <Avatar classes={avatarStyles} src={photo} />
        </Item>
        <Row wrap grow gap={0.5} minWidth={0}>
          <Item grow minWidth={0}>
            <div className={cx(styles.name, styles.text)}>{name}</div>
            <CoolState state={state}/>
          </Item>
          <Item position={"middle"}>
          <Link className="link" to={`/map/${n}`} label="MapFriends" value="mapFriend" onClick={window.sessionStorage.setItem("visitado", "false")}>
            <Button className={styles.btn} variant={"outlined"}>
              Go map <NotListedLocationIcon style={{ color: "#99DE9F" }}/>    
            </Button>
          </Link>
        </Item>
      </Row>
    </Row>
  );
}
//Modifica el State para que se vea mas bonito
function CoolState(props){
 var beautyState="";
 const stylesState = usePersonStyles();
 const argtest=props.state;

 if(argtest==="comer"){
    beautyState="Meal";
    return(
      <div className={cx(stylesState.caption, stylesState.text)}>
          {beautyState}
          <FastfoodRoundedIcon htmlColor="#dfc533"/>
      </div>
    );
  }
  if(argtest==="deporte"){
    beautyState="Sport";
    return(
      <div className={cx(stylesState.caption, stylesState.text)}>
          {beautyState}
          <DirectionsRunRoundedIcon htmlColor="#075bdc"/>
      </div>
    );
  }
  if(argtest==="default"){
    beautyState="Unspecified";
    return(
      <div className={cx(stylesState.caption, stylesState.text)}>
          {beautyState}
      </div>
    );
  }
  if(argtest==="cita"){
    beautyState="Date";
    return(
      <div className={cx(stylesState.caption, stylesState.text)}>
          {beautyState}
          <FavoriteRoundedIcon htmlColor="#dd1007"/>
      </div>
    );
  }
  if(argtest==="covid"){
    beautyState="Friend with Covid-19";
    return(
      <div className={cx(stylesState.caption, stylesState.text)}>
          <WarningRoundedIcon htmlColor="#ff2300"/>
          {beautyState}
          <WarningRoundedIcon htmlColor="#ff2300"/>
      </div>
    );
  }
  return(
    <div className={cx(stylesState.caption, stylesState.text)}>
      Unspecified
    </div>
  );
}
