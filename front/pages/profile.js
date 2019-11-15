import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import ProfileCard from "../components/ProfileCard";
import { useRouter } from "next/router";
import useUser from "../hooks/useUser";
import useOthers from "../hooks/useOthers";

const fadeIn = keyframes`
  from{
    opacity:0;
  }
  to {
    opacity:1;
  }
  `;

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 77px);
  display: flex;
  justify-content: center;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const GridContainer = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 20px;
`;

const MenuBox = styled.div``;

const ContentBox = styled.div`
  border-right: 1px solid #e6ecf0;
  border-left: 1px solid #e6ecf0;
`;

const FollowBox = styled.div``;

const Profile = () => {
  const {
    pathname,
    query: { id }
  } = useRouter();
  const { user } = useUser();
  const { others, onLoadOtherRequest } = useOthers();

  const isMine = pathname === "/profile";

  useEffect(() => {
    if (id) {
      onLoadOtherRequest(decodeURIComponent(id));
    }
  }, []);

  return (
    <Container>
      <GridContainer>
        <MenuBox />
        <ContentBox>
          {!id ? (
            user.isLoggedin ? (
              <ProfileCard info={user.myInformation} />
            ) : (
              <span>로그인 후 이용해주세요.</span>
            )
          ) : (
            <ProfileCard info={others.information} />
          )}
        </ContentBox>
        <FollowBox />
      </GridContainer>
    </Container>
  );
};

export default Profile;
