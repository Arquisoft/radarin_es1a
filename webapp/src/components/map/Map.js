import React, { useRef, useLayoutEffect, useEffect, useState, Fragment } from "react";
import { useWebId } from "@solid/react";
import "here-js-api/styles/mapsjs-ui.css";
import { store } from "react-notifications-component";
import {MapMarker} from  "./MapMarker";
import cache from "../friends/UserCache";

function Map() {

    const mapRef = useRef(null);
    // eslint-disable-next-line
    const solidId = useWebId();
    const [marcas, setMarcas] = useState([]);
    const [ui, setUI] = useState(null);
    const [map, setMap] = useState(null);
    const [userPosition, setUserPosition] = useState(null);

    const [friendsList, setFriendsList] = useState([]);

    // eslint-disable-next-line
    useEffect(() => {
        setFriendsList(cache.getFriends());
    });

    window.sessionStorage.setItem('friends', JSON.stringify(friendsList));

    // Default distanceRadius  5 km
    const radius = () => {
        if (window.sessionStorage.getItem("radius") != null) {
            return window.sessionStorage.getItem("radius").valueOf();
        }
        else {
            window.sessionStorage.setItem("radius", "5");
        }
        return window.sessionStorage.getItem("radius").valueOf();
    };

    var getRespuesta = async function (map, ui, userPosition) {
        var respuesta = await fetch("https://radarines1arestapi.herokuapp.com/api/users/lista"); //http://localhost:5000/api/users/lista
        var response = await respuesta.json();
        var friends = window.sessionStorage.getItem('friends');
        var id = window.sessionStorage.getItem('id');

        const list = response.filter(user => friends.includes(user.solidId) || user.solidId === id);

        //Borra la ubicación del usuario en sesión ELIMINAR
        map.removeObjects(map.getObjects());

        var nuevasMarcas = [];

        // eslint-disable-next-line
        list.map((item, index) => {

            if (distanceFilter(item.latitud, item.longitud, userPosition)) {
                var id = window.location.href.substring(
                    window.location.href.lastIndexOf("/") + 1,
                    window.location.href.lastIndexOf("*")
                )

                if (window.sessionStorage.getItem('visitado') !== 'true') {
                    if (item.solidId.includes(id) ) {
                        map.setCenter({ lat: item.latitud, lng: item.longitud });
                        map.setZoom(18);
                        window.sessionStorage.setItem('visitado', 'true');
                    }
                }
                var locationOfMarker = { lat: item.latitud, lng: item.longitud };
                nuevasMarcas.push({
                    locationOfMarker,
                    webId: item.solidId
                });
            }
        }
        );

        //Pinta el radio filtrado sobre el mapa
        paintRadius(map, userPosition);

        /*
                var marker = new H.map.Marker(LocationOfMarker, { icon: pngIcon });
                map.addObject(marker);
        */

        setMarcas(nuevasMarcas);
    };

    // Paint the filter radius around user
    var paintRadius = function (map, userPosition) {
        const H = window.H;
        //Paint radius on map
        map.addObject(new H.map.Circle(
            // The central point of the circle
            { lat: userPosition.coords.latitude, lng: userPosition.coords.longitude },
            // The radius of the circle in meters
            radius() * 1000,
            {
                style: {
                    strokeColor: "rgba(231, 76, 60, 0.6)", // Color of the perimeter
                    lineWidth: 2,
                    fillColor: "rgba(231, 76, 60, 0.1)"  // Color of the circle
                }
            }
        ));
    }
    // Auxiliar method to convert coords to radians.
    var toRadianes = function (valor) {
        return (Math.PI / 180) * valor;
    }
    // Calculates the distance between two coordinates according to Haversine Formule.
    var distanceFilter = function (lat2, lng2, userPosition) {
        var RadioTierraKm = 6378.0;

        var lat1 = userPosition.coords.latitude;
        var lng1 = userPosition.coords.longitude;
        var difLat = toRadianes(lat2 - lat1);
        var difLng = toRadianes(lng2 - lng1);

        var a = Math.pow(Math.sin(difLat / 2), 2) +
            Math.cos(toRadianes(lat1)) *
            Math.cos(toRadianes(lat2)) *
            Math.pow(Math.sin(difLng / 2), 2);

        var c = RadioTierraKm * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
        if (c > radius()) {
            return false;
        }

        return true;
    }


    useLayoutEffect(() => {

        function addFriends(map, ui, userPosition) {
            getRespuesta(map, ui, userPosition);
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

        store.addNotification({
            title: "Notificación",
            message: "Bienvenido a Radarin!",
            type: "default",
            insert: "top",
            container: "top-left",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 2000
            },
            dismissable: { click: true }
        });

        navigator.geolocation.getCurrentPosition((position) => {

            console.log(position);
            setUserPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
            const H = window.H;

            map.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
            // Circulo auxiliar para calcular el zoom al iniciar el mapa.
            var circle = new H.map.Circle(
                // The central point of the circle
                { lat: position.coords.latitude, lng: position.coords.longitude },
                // The radius of the circle in meters
                radius() * 1000,
                {
                    style: {
                        strokeColor: "rgba(231, 76, 60, 0.6)", // Color of the perimeter
                        lineWidth: 2,
                        fillColor: "rgba(231, 76, 60, 0.1)"  // Color of the circle
                    }
                }
            );
            map.addObject(circle);
            map.getViewModel().setLookAtData({
                bounds: circle.getBoundingBox()
            });

            //Resize of map in window
            window.addEventListener("resize", () => map.getViewPort().resize());

            // Create a marker icon from an image URL:
            //var pngIcon = new H.map.Icon("/img/marker.png", { size: { w: 24, h: 24 } });

            // First iteration
            addFriends(map, ui, position);

            // Then repeat each 30000
            setInterval(() => { addFriends(map, ui, position); }, 1000);

        }, (error) => {
            console.error(error);
        });
        return () => {
            map.dispose();
        }
    }, // eslint-disable-next-line
        [mapRef]);

    return (
        // Set a height on the map so it will display

        <Fragment>
            <div ref={mapRef} id="map" />
            {
                marcas.map((marca, i) => <MapMarker
                    key={`marca_${i}`}
                    webId={marca.webId}
                    locationOfMarker={marca.locationOfMarker}
                    ui={ui}
                    map={map} />)
            }

            <MapMarker
                webId={solidId}
                locationOfMarker={userPosition}
                ui={ui}
                map={map} />
        </Fragment>
    );
}

export default Map;