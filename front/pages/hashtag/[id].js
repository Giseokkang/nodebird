import React, { useEffect } from "react";
import { useRouter } from "next/router";
import styled, { keyframes } from "styled-components";
import usePost from "../../hooks/usePost";
import usePopUp from "../../hooks/usePopUp";
import PopUp from "../../components/PopUp";
import PostingCard from "../../components/PostingCard";
import { BORDER_COLOR } from "../../utils/colors";

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
  opacity: ${props => (props.isOnPopUp ? 0.2 : 1)};
`;

const GridContainer = styled.div`
  width: 80%;
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  grid-gap: 20px;
`;

const MenuBox = styled.div``;

const ContentBox = styled.div`
  border-right: 1px solid ${BORDER_COLOR};
  border-left: 1px solid ${BORDER_COLOR};
`;

const PostingBox = styled.div`
  overflow: scroll;
  height: calc(100vh - 247px);
`;

const FollowBox = styled.div``;

const Hashtag = () => {
  const router = useRouter();
  const {
    query: { id }
  } = router;

  const {
    post: { mainPosts },
    onLoadHashtagPosts
  } = usePost();
  const { isOnPopUp } = usePopUp();

  useEffect(() => {
    if (id) {
      onLoadHashtagPosts(decodeURIComponent(id));
    }
  }, [id]);

  return (
    <>
      {isOnPopUp && <PopUp></PopUp>}
      <Container isOnPopUp={isOnPopUp}>
        <GridContainer>
          <MenuBox />
          <ContentBox>
            <PostingBox>
              {mainPosts &&
                mainPosts.length > 0 &&
                mainPosts.map(post => (
                  <PostingCard
                    key={post.id}
                    id={post.id}
                    userId={post.UserId}
                    nickname={post.User.nickname}
                    content={post.content}
                    createdAt={post.createdAt}
                  ></PostingCard>
                ))}
            </PostingBox>
          </ContentBox>
          <FollowBox />
        </GridContainer>
      </Container>
    </>
  );
};

export default Hashtag;
