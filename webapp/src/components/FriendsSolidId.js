import React from "react";
import { useLDflexList, useWebId } from "@solid/react";
import UsersCompare from "./UsersCompare";

const FriendsSolidId = (props) => {
    const webId = useWebId();
    const solidFriends = useLDflexList(`[${webId}].knows`).map(friend=> `${friend}`);

    return <UsersCompare solidFriends={solidFriends} ></UsersCompare>;
}

export default FriendsSolidId;