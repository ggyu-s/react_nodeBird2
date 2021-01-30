import React, { useEffect } from "react"; // next.js 에서 생략 가능(상관없음)
import { useDispatch, useSelector } from "react-redux";
import AppLayout from "../components/AppLayout";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { LOAD_POST_REQUEST } from "../reducers/post";
import { LOAD_USER_REQUEST } from "../reducers/user";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost, loadPostLoading } = useSelector(
    (state) => state.post
  );
  useEffect(() => {
    dispatch({
      type: LOAD_USER_REQUEST,
    });
    dispatch({
      type: LOAD_POST_REQUEST,
    });
  }, []);
  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      const ch = document.documentElement.clientHeight;
      const sh = document.documentElement.scrollHeight;
      if (y + ch > sh - 200) {
        if (hasMorePost && !loadPostLoading) {
          dispatch({
            type: LOAD_POST_REQUEST,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePost, loadPostLoading]);

  return (
    <AppLayout>
      {me && <PostForm />}
      {mainPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </AppLayout>
  );
};

export default Home;
