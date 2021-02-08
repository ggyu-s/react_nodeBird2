import { Avatar, Card } from "antd";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { END } from "redux-saga";
import AppLayout from "../../components/AppLayout";
import PostCard from "../../components/PostCard";
import { LOAD_HASHTAG_POSTS_REQUEST } from "../../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../../reducers/user";
import wrapper from "../../store/configureStore";

function User() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tag } = router.query;
  const { mainPosts, hasMorePost, loadPostLoading } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      const ch = document.documentElement.clientHeight;
      const sh = document.documentElement.scrollHeight;
      if (y + ch > sh - 200) {
        if (hasMorePost && !loadPostLoading) {
          dispatch({
            type: LOAD_HASHTAG_POSTS_REQUEST,
            lastId:
              mainPosts[mainPosts.length - 1] &&
              mainPosts[mainPosts.length - 1].id,
            data: tag,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePost, mainPosts.length, loadPostLoading]);

  return (
    <AppLayout>
      {mainPosts.map((c) => (
        <PostCard key={c.id} post={c} />
      ))}
    </AppLayout>
  );
}
export const getServerSideProps = wrapper.getServerSideProps(
  async (context) => {
    const cookie = context.req ? context.req.headers.cookie : "";
    axios.defaults.headers.Cookie = "";
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_HASHTAG_POSTS_REQUEST,
      data: context.params.id,
    });
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
  }
);

export default User;
