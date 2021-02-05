import { Avatar, Card } from "antd";
import axios from "axios";
import React, { useEffect } from "react"; // next.js 에서 생략 가능(상관없음)
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { LOAD_POST_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST } from "../reducers/user";
import wrapper from "../store/configureStore";

const About = () => {
  const { userInfo } = useSelector((state) => state.user);

  return (
    <AppLayout>
      {userInfo ? (
        <Card
          actions={[
            <div key="twit">
              짹짹
              <br />
              {userInfo.Posts.length}
            </div>,
            <div key="following">
              팔로잉
              <br />
              {userInfo.Followings.length}
            </div>,
            <div key="follower">
              팔로워
              <br />
              {userInfo.Followers.length}
            </div>,
          ]}
        >
          <Card.Meta
            avatar={<Avatar>{userInfo.nickname[0]}</Avatar>}
            title={userInfo.nickname}
            description="노드버드 매니아"
          />
        </Card>
      ) : null}
    </AppLayout>
  );
};

export const getStaticProps = wrapper.getStaticProps(async (context) => {
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: 1,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
});

export default About;
