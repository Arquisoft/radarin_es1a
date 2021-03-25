import React from 'react';
import styled from 'styled-components';
import UserList from './components/friends/UserList'
const Wrapper = styled.div`
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;
export const FriendsView = () => {
  return(
  <Wrapper>
    <h2>FriendList</h2>
    <UserList/>
  </Wrapper>

  );};
