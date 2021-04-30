import React, { useRef, useLayoutEffect, useEffect, useState, Fragment } from "react";
import { useWebId } from "@solid/react";
import "here-js-api/styles/mapsjs-ui.css";
import { MapMarker } from "./MapMarker";
import cache from "../friends/UserCache";
import * as LocationFunctions from "./LocationFunctions";
function Map() {

    const mapRef = useRef(null);
    // eslint-disable-next-line
    const solidId = useWebId();
    const [marcas, setMarcas] = useState([]);
    const [ui, setUI] = useState(null);
    const [map, setMap] = useState(null);

    const [friendsList, setFriendsList] = useState([]);

    // eslint-disable-next-line
    useEffect(() => {
        setFriendsList(cache.getFriends());
    });

    window.sessionStorage.setItem("friends", JSON.stringify(friendsList));

    let nearFriends = new Set();

    /** Busca los amigos alrededor del usuario, tambien pinta en el mapa los marcadores de cada uno, incluido el propio usuario de la app, ademas manda las notificaciones correspondientes*/
    async function getRespuesta(map, ui) {
        var respuesta = await fetch("https://radarines1arestapi.herokuapp.com/api/users/lista"); //http://localhost:5000/api/users/lista
        var response = await respuesta.json();
        var friends = window.sessionStorage.getItem("friends") ?? [];
        var id = window.sessionStorage.getItem("id");

        const list = response.filter(user => friends.includes(user.solidId) || user.solidId === id);

        map.removeObjects(map.getObjects());

        var nuevasMarcas = [];

        let newNearFriends = LocationFunctions.findNearFriends(list, list.filter(user => user.solidId === id)[0]);

        for (const friend of newNearFriends) {
            const id = window.location.href.substring(
                window.location.href.lastIndexOf("/") + 1,
                window.location.href.lastIndexOf("*")
            );

            if (window.sessionStorage.getItem("visitado") !== "true") {
                if (friend.solidId.includes(id)) {
                    map.setCenter({ lat: friend.latitud, lng: friend.longitud });
                    map.setZoom(18);
                    window.sessionStorage.setItem("visitado", "true");
                }
            }
            const locationOfMarker = { lat: friend.latitud, lng: friend.longitud };
            nuevasMarcas.push({
                locationOfMarker,
                webId: friend.solidId,
                timeStamp: friend.timeStamp,
                userState: friend.userState
            });
        }

        nearFriends = LocationFunctions.notifyNearFriends(id, nearFriends, newNearFriends);

        setMarcas(nuevasMarcas);
    }

    useLayoutEffect(() => {

        function addFriends(map, ui) {
            getRespuesta(map, ui);
        }

        if (!mapRef.current) { return; }

        const H = window.H;
        const platform = new H.service.Platform({
            apikey: "s13roZogcqn6MI6dAT_MLNQ7PLMXbdmFMHSZfAEH1aI"
        });

        const defaultLayers = platform.createDefaultLayers();

        // Create an instance of the map
        const map = new H.Map(
            mapRef.current,
            defaultLayers.vector.normal.map,
            {
                center: { lat: 50, lng: 5 },
                zoom: 4,
                pixelRatio: window.devicePixelRatio || 1
            }
        );
        setMap(map);
        // MapEvents enables the event system
        // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
        // This variable is unused and is present for explanatory purposes
        new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        // Create the default UI components to allow the user to interact with them
        // This variable is unused
        const ui = H.ui.UI.createDefault(map, defaultLayers);
        setUI(ui);

        // Circulo auxiliar para calcular el zoom al iniciar el mapa, necesita la posicion del usuario, 
        // es casi mejor cogerla directamente del hardware que consultar en la base.
        navigator.geolocation.getCurrentPosition((position) => {
            var circle = new H.map.Circle(
                // The central point of the circle
                { lat: position.coords.latitude, lng: position.coords.longitude },
                // The radius of the circle in meters
                LocationFunctions.radius() * 1000,
                {
                    style: {
                        strokeColor: "rgba(231, 76, 60, 0)", // Color of the perimeter
                        lineWidth: 2,
                        fillColor: "rgba(231, 76, 60, 0)"  // Color of the circle
                    }
                }
            );
            map.getViewModel().setLookAtData({
                bounds: circle.getBoundingBox()
            });
        }, (error) => {
            console.error(error);
        });

        // Intervalo de tiempo en el que busca los amigos alrededor del usuario, tambien pinta en el mapa los marcadores, y notificaciones.
        setInterval(() => { addFriends(map, ui); }, 3000);

        return () => {
            map.dispose();
        };
    }, // eslint-disable-next-line
        [mapRef]);

    return (
        <Fragment>

            <div ref={mapRef} id="map" />

            {
                marcas.map((marca, i) => <MapMarker
                    key={`marca_${i}`}
                    webId={marca.webId}
                    locationOfMarker={marca.locationOfMarker}
                    timeStamp={marca.timeStamp}
                    state={marca.userState}
                    ui={ui}
                    map={map} />)
            }

        </Fragment >
    );
}

export default Map;