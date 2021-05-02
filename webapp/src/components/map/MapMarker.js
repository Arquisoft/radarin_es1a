import { useEffect } from "react";
import { useLDflexValue, useWebId } from "@solid/react";
import "here-js-api/styles/mapsjs-ui.css";
import * as LocationFunctions from "./LocationFunctions"

import cx from "clsx";
import { makeStyles } from "@material-ui/core";
import DirectionsRunRoundedIcon from "@material-ui/icons/DirectionsRunRounded";
import FastfoodRoundedIcon from "@material-ui/icons/FastfoodRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";
import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
import ReactDOMServer from "react-dom/server";

export function MapMarker({ webId, locationOfMarker, timeStamp, state, ui, map }) {
    const nombre = useLDflexValue("[" + webId + "].name");
    const solidId = useWebId();

    useEffect(() => {

        if (webId && nombre && locationOfMarker && ui && map) {
            const H = window.H;
            let pngIcon;

            if (webId === solidId) {
                pngIcon = new H.map.Icon("/img/gps.png", { size: { w: 24, h: 24 } });


                //Pinta el circulo alrededor del marcador del usuario.
                var circle = new H.map.Circle(
                    // The central point of the circle
                    { lat: locationOfMarker.lat, lng: locationOfMarker.lng },
                    // The radius of the circle in meters
                    LocationFunctions.radius() * 1000,
                    {
                        style: {
                            strokeColor: "rgba(231, 76, 60, 0.6)", // Color of the perimeter
                            lineWidth: 2,
                            fillColor: "rgba(231, 76, 60, 0.1)"  // Color of the circle
                        }
                    }
                );
                map.addObject(circle);
            }

            else {
                if (state === "covid")
                    pngIcon = new H.map.Icon("/img/covid_marker.png", { size: { w: 24, h: 24 } });
                else
                    pngIcon = new H.map.Icon("/img/marker.png", { size: { w: 24, h: 24 } });
            }
            let marker = new H.map.Marker(locationOfMarker, { icon: pngIcon });
            map.addObject(marker);

            marker.addEventListener("tap", logEvent => {
                let bubble = new H.ui.InfoBubble({ lat: locationOfMarker.lat, lng: locationOfMarker.lng }, {
                    // eslint-disable-next-line
                    content: `${nombre}` + '<p></p>' + `${new Date(timeStamp).toLocaleString()}` + '<p></p>' + `${ReactDOMServer.renderToString(CoolState(state))}`,
                });

                ui.addBubble(bubble);
            }, false);

        }
    }, [webId, nombre, locationOfMarker, timeStamp, state, ui, map, solidId]);

    return null;
}

//Modifica el State para que se vea mas bonito
export function CoolState(props) {
    var beautyState = "";
    const stylesState = makeStyles(() => ({
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
    const argtest = props;

    if (argtest === "comer") {
        beautyState = "Meal";
        return (
            <div className={cx(stylesState.caption, stylesState.text)}>
                {beautyState}
                <FastfoodRoundedIcon htmlColor="#dfc533" />
            </div>
        );
    }
    if (argtest === "deporte") {
        beautyState = "Sport";
        return (
            <div className={cx(stylesState.caption, stylesState.text)}>
                {beautyState}
                <DirectionsRunRoundedIcon htmlColor="#075bdc" />
            </div>
        );
    }
    if (argtest === "default") {
        beautyState = "Unspecified";
        return (
            <div className={cx(stylesState.caption, stylesState.text)}>
                {beautyState}
            </div>
        );
    }
    if (argtest === "cita") {
        beautyState = "Date";
        return (
            <div className={cx(stylesState.caption, stylesState.text)}>
                {beautyState}
                <FavoriteRoundedIcon htmlColor="#dd1007" />
            </div>
        );
    }
    if (argtest === "covid") {
        beautyState = "Friend with Covid-19";
        return (
            <div className={cx(stylesState.caption, stylesState.text)}>
                {beautyState}
                <WarningRoundedIcon htmlColor="#ff2300" />
            </div>
        );
    }

    return (
        <div className={cx(stylesState.caption, stylesState.text)}>

        </div>
    );
}
