import { useEffect } from "react";
import { useLDflexValue, useWebId } from "@solid/react";
import "here-js-api/styles/mapsjs-ui.css";
import * as LocationFunctions from "./LocationFunctions"

export function MapMarker({ webId, locationOfMarker, ui, map }) {
    const nombre = useLDflexValue("[" + webId + "].name");
    const solidId = useWebId();

    useEffect(() => {

        if (webId && nombre && locationOfMarker && ui && map) {
            const H = window.H;
            let pngIcon;

            if (webId === solidId) {
                pngIcon = new H.map.Icon("/img/gps.png", { size: { w: 24, h: 24 } });
                //Pinta el circulo alrededor del marcador del usuario.
                map.addObject(new H.map.Circle(
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
                ));
            }
            else {
                pngIcon = new H.map.Icon("/img/marker.png", { size: { w: 24, h: 24 } });
            }
            let marker = new H.map.Marker(locationOfMarker, { icon: pngIcon });
            map.addObject(marker);

            marker.addEventListener("tap", logEvent => {
                let bubble = new H.ui.InfoBubble({ lat: locationOfMarker.lat, lng: locationOfMarker.lng }, {
                    content: `${nombre}`,
                });
                ui.addBubble(bubble);
            }, false);

        }
    }, [webId, nombre, locationOfMarker, ui, map, solidId]);

    return null;
}
