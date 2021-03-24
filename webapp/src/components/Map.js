import React, { useRef, useLayoutEffect } from 'react';

import 'here-js-api/styles/mapsjs-ui.css';


function addFriends(map, ui) {

    console.log("ahora")
    getRespuesta(map, ui);
}
var getRespuesta = async function (map, ui) {
    var respuesta = await fetch('http://localhost:5000/api/users/lista')
    var response = await respuesta.json();
    const H = window.H;
    var pngIcon = new H.map.Icon("/img/marker.png", { size: { w: 24, h: 24 } });
    response.map((item, index) => {
        var LocationOfMarker = { lat: item.latitud, lng: item.longitud };
        var marker = new H.map.Marker(LocationOfMarker, { icon: pngIcon });
        map.addObject(marker);

        marker.addEventListener('tap', logEvent => {
            var bubble = new H.ui.InfoBubble({ lat: item.latitud, lng: item.longitud }, {
                content: '<b>{item.solidId}</b>'
            });
            ui.addBubble(bubble);
        }, false);
        console.log(item)
    }
    )
}



function Map() {

    const mapRef = useRef(null);

    useLayoutEffect(() => {

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
                    content: '<b>Usuario A</b>'
                });
                ui.addBubble(bubble);
            }, false);
            // show info bubble
            addFriends(map, ui)



        }, (error) => {
            console.error(error);
        })
        return () => {
            map.dispose();
        }
    }, [mapRef]);

    return (
        // Set a height on the map so it will display
        <div ref={mapRef} id="map" />
    );
}

export default Map;