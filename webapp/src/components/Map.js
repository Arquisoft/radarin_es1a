import React, { useCallback, useEffect, useState } from 'react';

import 'here-js-api/styles/mapsjs-ui.css';

function Map() {

    const [map, setMap] = useState(null);

    const [ui, setUi] = useState(null);

    const mapRef = useCallback((nodo) => {
        const H = window.H;
        const platform = new H.service.Platform({
            apikey: "s13roZogcqn6MI6dAT_MLNQ7PLMXbdmFMHSZfAEH1aI"
        });

        const defaultLayers = platform.createDefaultLayers();

        // Create an instance of the map
        const map = new H.Map(
            nodo,
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
        setUi(H.ui.UI.createDefault(map, defaultLayers));

        setMap(map);

    }, [setMap]); //regenera mapref cada vez que cambie el map

    useEffect(() => {
        if (map) {
            console.log(navigator.geolocation);
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

                marker.addEventListener('tap', logEvent => {
                    var bubble = new H.ui.InfoBubble({ lng: position.coords.longitude, lat: position.coords.latitude + 2 }, {
                        content: '<b>Usuario A</b>'
                    });
                    ui.addBubble(bubble);
                }, false);
                // show info bubble

                // Add the marker to the map:
                map.addObject(marker);

            }, (error) => {
                console.error(error);
            })
            return () => {
                map?.dispose();
            }
        }
    }, [map]);

    return (
        // Set a height on the map so it will display
        <div ref={mapRef} id="map" />
    );

}

export default Map;