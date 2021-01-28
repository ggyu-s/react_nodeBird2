import axios from "axios";
import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import shortid from "shortid";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  generateDummyPost,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
} from "../reducers/post";
import {
  ADD_POST_TO_ME,
  REMOVE_POST_OF_ME,
  SIGN_UP_DONE_INTIT,
} from "../reducers/user";

function loadPostAPI(data) {
  return axios.post("/api/posts", data);
}

function* loadPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: LOAD_POST_SUCCESS,
      data: generateDummyPost(10),
    });
    yield put({
      type: SIGN_UP_DONE_INTIT,
    });
  } catch (err) {
    console.log("err", err);
    yield put({
      type: LOAD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  return axios.post("/api/addpost", data);
}

function* addPost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    const id = shortid.generate();
    yield put({
      type: ADD_POST_SUCCESS,
      data: {
        id,
        content: action.data,
      },
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: id,
    });
  } catch (err) {
    yield put({
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.post("/api/removePost", data);
}

function* removePost(action) {
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: action.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/api/${data.postId}/addpost`, data);
}

function* addComment(action) {
  try {
    // const result = yield call(addCommentAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: action.data,
    });
  } catch (err) {
    yield put({
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPost),
  ]);
}
