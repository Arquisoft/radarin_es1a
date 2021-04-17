const subscriptions = {};
var crypto = require("crypto");
const webpush = require("web-push");

const vapidKeys = {
    publicKey: 'BCbSgw55YAqE9urspV9tfTeddhzXl2DHNFIZmPwqrd2uNiAdXEOicOXYMg0jMGlLWytlY2JNq4tiiUw0urfpAJg',
    privateKey: 'dUFZoOBMaegjrTAIO_2sZyNRVvVJfMOdJxN4PNyMDqI'
  };

console.log(vapidKeys);

webpush.setVapidDetails("mailto:example@yourdomain.org", vapidKeys.publicKey, vapidKeys.privateKey);

function createHash(input) {
  const md5sum = crypto.createHash("md5");
  md5sum.update(Buffer.from(input));
  return md5sum.digest("hex");
}

function handlePushNotificationSubscription(req, res) {
  const subscriptionRequest = req.body;
  const susbscriptionId = createHash(JSON.stringify(subscriptionRequest));
  subscriptions[susbscriptionId] = subscriptionRequest;
  res.status(201).json({ id: susbscriptionId });
}

function sendPushNotification(req, res) {
  const subscriptionId = req.params.id;
  const pushSubscription = subscriptions[subscriptionId];
  webpush
    .sendNotification(
      pushSubscription,
      JSON.stringify({
        title: "New Product Available ",
        text: "HEY! Take a look at this brand new t-shirt!",
        image: "../img/map_preview.PNG",  //Cambiar
        tag: "new-product",
        url: "/index.html"     //Cambiar
      })
    )
    .catch(err => {
      console.log(err);
    });

  res.status(202).json({});
}

module.exports = { handlePushNotificationSubscription, sendPushNotification };
