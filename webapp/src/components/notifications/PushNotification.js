import React from "react";
import usePushNotifications from "./usePushNotifications";

const Loading = ({ loading }) => (loading ? <div className="app-loader">Please wait, we are loading something...</div> : null);
const Error = ({ error }) =>
  error ? (
    <section className="app-error">
      <h2>{error.name}</h2>
      <p>Error message : {error.message}</p>
      <p>Error code : {error.code}</p>
    </section>
  ) : null;

export default function PushNotificationDemo() {
  const {
    userConsent,
    pushNotificationSupported,
    userSubscription,
    onClickAskUserPermission,
    onClickSusbribeToPushNotification,
    onClickSendSubscriptionToPushServer,
    pushServerSubscriptionId,
    onClickSendNotification,
    error,
    loading
  } = usePushNotifications();

  const isConsentGranted = userConsent === "granted";
  if(pushNotificationSupported){
    onClickAskUserPermission();
    if(isConsentGranted && !userSubscription){
        onClickSusbribeToPushNotification();
        if(!pushServerSubscriptionId){
          onClickSendSubscriptionToPushServer();
          onClickSendNotification();
        }
    }
  }
}