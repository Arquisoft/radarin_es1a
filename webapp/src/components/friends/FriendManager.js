import { useLDflexValue, useLDflexList } from '@solid/react';
import Friend from '../../entities/Friend';
const { default: data } = require('@solid/query-ldflex');

export async function GetUserWebId() {
    const auth = require('solid-auth-client');
    try {
        let session = await auth.currentSession();
        return session.webId;
    } catch (TypeError) {
        return null;
    }
};

export async function GetUserFriends() {
    const friends = useLDflexList('user.friends');
    let friendsAux = [];

    //For each value (LDflexValue) in friends(LDflexValue [])
    friends.forEach(async (friendLDflexValue) => {

        let friendWebIdLDflexValue = friendLDflexValue.value;
        const webId = data[friendWebIdLDflexValue];

        //Use the await to retrieve the data from the Promise object.
        const name = await GetSpecificName(webId);
        const profilePic = await GetSpecificProfileImage(webId);

        let friendAux = new Friend(webId.toString(), name, profilePic);

        friendsAux.push(friendAux);
    });

    return friendsAux;
};

export async function GetSpecificName(webId) {
    const personName = await webId.name;
    try {
        return personName.value;
    } catch (TypeError) {

        return webId.toString().substring(8, webId.toString().length - 1);
    }
};

export async function GetSpecificProfileImage(webId) {
    const photo = await webId.vcard_hasPhoto;
    try {
        return photo.value;
    } catch (TypeError) {

        return "images/userPictureUndefined";
    }
}