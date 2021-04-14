import { useEffect, useState } from "react";
import { useLDflexValue, useLDflexList } from "@solid/react";
import Friend from "../../entities/Friend";

const { default: data } = require("@solid/query-ldflex");

export function GetUserName() {
    const name = useLDflexValue("user.name") || "unknown";
    return name.value;
}

export async function GetUserWebId() {
    const auth = require("solid-auth-client");
    try {
        let session = await auth.currentSession();
        return session.webId;
    } catch (TypeError) {
        return null;
    }
}

export async function GetUserProfileImage() {
    const photo = useLDflexValue("user.vcard_hasPhoto") || "unknown";
    return photo.value;
}

export function useGetUserFriends() {
    const [friendsList, setFriendsList] = useState([]);
    const friends = useLDflexList("user.friends");

    useEffect(() => {
        async function loadFriendsAsync () {
            const friendsAux = await Promise.all(friends.map(async friend => {
                let friendWebIdLDflexValue = friend.value;
                const webId = data[friendWebIdLDflexValue];
                //Use the await to retrieve the data from the Promise object.
                const name = await GetSpecificName(webId);
                const profilePic = await GetSpecificProfileImage(webId);
        
                return new Friend(webId.toString(), name, profilePic);        
            }));
            setFriendsList(friendsAux);

        };
        loadFriendsAsync();
    },[friends]);
   
    return friendsList;
}

export async function GetSpecificName(webId) {
    const personName = await webId.name;
    try {
        return personName.value;
    } catch (TypeError) {

        return webId.toString().substring(8, webId.toString().length - 1);
    }
}

export async function GetSpecificProfileImage(webId) {
    const photo = await webId.vcard_hasPhoto;
    try {
        return photo.value;
    } catch (TypeError) {

        return "images/userPictureUndefined";
    }
}