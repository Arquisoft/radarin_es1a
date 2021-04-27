import { useEffect } from "react";
import { useLDflexValue, useWebId } from "@solid/react";
import "here-js-api/styles/mapsjs-ui.css";

export function MapMarker({ webId, locationOfMarker, ui, map }) {
    const nombre = useLDflexValue("[" + webId + "].name");
    const solidId = useWebId();

    useEffect(() => {

        if (webId && nombre && locationOfMarker && ui && map) {
            const H = window.H;
            let pngIcon;

            if (webId === solidId) {
                pngIcon = new H.map.Icon("/img/gps.png", { size: { w: 24, h: 24 } });
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
