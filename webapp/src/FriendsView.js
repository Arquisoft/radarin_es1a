import React from 'react';
import styled from 'styled-components';
import ProfileFriends from './components/friends/FriendList';
const Wrapper = styled.div`
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;
export const FriendsView = () => {
  return(
  <Wrapper>
    <ProfileFriends/>
  </Wrapper>

  );};
