const pushServerPublicKey = "BCbSgw55YAqE9urspV9tfTeddhzXl2DHNFIZmPwqrd2uNiAdXEOicOXYMg0jMGlLWytlY2JNq4tiiUw0urfpAJg";
/**
 * checks if Push notification and service workers are supported by your browser
 */
 function isPushNotificationSupported() {
    return "serviceWorker" in navigator && "PushManager" in window;
  }
  
  /**
   * asks user consent to receive push notifications and returns the response of the user, one of granted, default, denied
   */
  async function askUserPermission() {
    return await Notification.requestPermission();
  }

  /**
   * shows a notification
   */
  function sendNotification() {
    const img = "../img/map_preview.PNG";    //Cambiar
    const text = "Take a look at this brand new t-shirt!";
    const title = "New Product Available";
    const options = {
      body: text,
      icon: "../img/map_preview.PNG",   //Cambiar
      vibrate: [200, 100, 200],
      tag: "new-product",
      image: img,
      badge: "https://spyna.it/icons/android-icon-192x192.png",    //Cambiar
      actions: [{ action: "Detail", title: "View", icon: "https://via.placeholder.com/128/ff0000" }] 
    };
    navigator.serviceWorker.ready.then(function(serviceWorker) {
      serviceWorker.showNotification(title, options);
    });
  }
  
  /**
   * Registers a service worker
   */
  function registerServiceWorker() {
    navigator.serviceWorker.register("./ServiceWorker.js");
}
  
async function createNotificationSubscription() {
    //wait for service worker installation to be ready
    const serviceWorker = await navigator.serviceWorker.ready;
    // subscribe and return the subscription
    return await serviceWorker.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: pushServerPublicKey
    });
  }

  /**
 * returns the subscription if present or nothing
 */
function getUserSubscription() {
    //wait for service worker installation to be ready, and then
    return navigator.serviceWorker.ready
      .then(function(serviceWorker) {
        return serviceWorker.pushManager.getSubscription();
      })
      .then(function(pushSubscription) {
        return pushSubscription;
      });
  }
  
  export {
    isPushNotificationSupported,
    askUserPermission,
    registerServiceWorker,
    sendNotification,
    createNotificationSubscription,
    getUserSubscription
  };