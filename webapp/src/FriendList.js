import React from 'react';
import styled from 'styled-components';
import UserList from './components/UserList'
const Wrapper = styled.div`
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;
export const FriendList = () => (
  <Wrapper>
    <h2>FriendList</h2>
    <UserList/>
  </Wrapper>
  
)