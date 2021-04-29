import { store } from "react-notifications-component";

// Default distanceRadius  5 km
export const radius = () => {
    if (window.sessionStorage.getItem("radius") != null) {
        return window.sessionStorage.getItem("radius").valueOf();
    }
    else {
        window.sessionStorage.setItem("radius", "5");
    }
    return window.sessionStorage.getItem("radius").valueOf();
};

// Auxiliar method to convert coords to radians.
export const toRadianes = function (valor) {
    return (Math.PI / 180) * valor;
}

// Calculates the distance between two coordinates according to Haversine Formule.
export function distanceFilter (lat2, lng2, userPosition) {
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

export function findNearFriends (list, userPosition){
    // eslint-disable-next-line
    return list.filter((item, index) => distanceFilter(item.latitud, item.longitud, userPosition));
}

/**
 * @param nearFriends {Set}
 * @param newNearFriends {{solidId: string}[]}
 */
export function notifyNearFriends(solidId, nearFriends, newNearFriends){
    let show = false;

    for(const friend of newNearFriends){
        if(!nearFriends.has(friend.solidId) && friend.solidId !== solidId){
            show = true;
            break;
        }
    }
    nearFriends = new Set(newNearFriends.map((friend)=>friend.solidId));

    if(show){
        store.addNotification({
            title: "Radarin",
            message: "There are friends close to you!",
            type: "info",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              showIcon: true
            }
          });
          show = false;
      }

    return nearFriends;
}
