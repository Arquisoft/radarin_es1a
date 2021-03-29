import React, { useRef, useLayoutEffect } from 'react';
import { useWebId } from '@solid/react';

import 'here-js-api/styles/mapsjs-ui.css';

function Map() {

    const mapRef = useRef(null);
    // eslint-disable-next-line
    const solidId = useWebId();

    // Default distanceRadius  5 km
    const distanceRadius = 5;

    var getRespuesta = async function (map, ui, userPosition) {
        var respuesta = await fetch('http://localhost:5000/api/users/lista')
        var response = await respuesta.json();
        const H = window.H;
        var pngIcon = new H.map.Icon("/img/marker.png", { size: { w: 24, h: 24 } });
        map.removeObjects(map.getObjects())

        // eslint-disable-next-line
        response.map((item, index) => {

            if (distanceFilter(item.latitud, item.longitud, userPosition)) {
                var LocationOfMarker = { lat: item.latitud, lng: item.longitud };
                var marker = new H.map.Marker(LocationOfMarker, { icon: pngIcon });
                map.addObject(marker);

                marker.addEventListener('tap', logEvent => {
                    var bubble = new H.ui.InfoBubble({ lat: item.latitud, lng: item.longitud }, {
                        content: item.solidId
                    });
                    ui.addBubble(bubble);
                }, false);

                console.log(item)
            }
        }
        )
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

        if (c > distanceRadius)
            return false;
        return true;
    }

    var toRadianes = function (valor) {
        return (Math.PI / 180) * valor;
    }

    useLayoutEffect(() => {

        function addFriends(map, ui, userPosition) {

            getRespuesta(map, ui, userPosition);
        }

        if (!mapRef.current) return;

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
                // This map is centered over Europe
                center: { lat: 50, lng: 5 },
                zoom: 4,
                pixelRatio: window.devicePixelRatio || 1
            }
        );

     

        // MapEvents enables the event system
        // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
        // This variable is unused and is present for explanatory purposes
        new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

        // Create the default UI components to allow the user to interact with them
        // This variable is unused
        const ui = H.ui.UI.createDefault(map, defaultLayers);

        navigator.geolocation.getCurrentPosition((position) => {
            console.log(position);
            const H = window.H;

            map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
            map.setZoom(13);
            
            //Resize of map in window
            window.addEventListener("resize", () => map.getViewPort().resize());

            // Create a marker icon from an image URL:
            var pngIcon = new H.map.Icon("/img/marker.png", { size: { w: 24, h: 24 } });

            var LocationOfMarker = { lat: position.coords.latitude, lng: position.coords.longitude };

            // Create a marker using the previously instantiated icon:
            ///var marker = new H.map.Marker(LocationOfMarker, { icon: icon });  
            var marker = new H.map.Marker(LocationOfMarker, { icon: pngIcon });
            // Add the marker to the map:
            map.addObject(marker);

            marker.addEventListener('tap', logEvent => {
                var bubble = new H.ui.InfoBubble({ lng: position.coords.longitude, lat: position.coords.latitude }, {
                    content: 'Mi usuario'
                });
                ui.addBubble(bubble);
            }, false);
            // show info bubble

            // First iteration
            addFriends(map, ui, position);

            // Then repeat each 30000
            setInterval(() => { addFriends(map, ui, position); }, 30000);

        }, (error) => {
            console.error(error);
        })
        return () => {
            map.dispose();
        }
    }, // eslint-disable-next-line 
        [mapRef]);

    return (
        // Set a height on the map so it will display
        <div ref={mapRef} id="map" />
    );
}

export default Map;