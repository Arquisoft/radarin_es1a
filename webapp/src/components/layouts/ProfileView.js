import React from "react";
import styled from "styled-components";
import UserProfile from "../user/UserProfile";
const Wrapper = styled.div`
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;
export const ProfileView = () => {
  return(
  <Wrapper>
    <UserProfile/>
  </Wrapper>
  );};
