import { createWrapper } from "next-redux-wrapper";
import { createStore, applyMiddleware, compose } from "redux";
import reducer from "../reducers";
import { composeWithDevTools } from "redux-devtools-extension";

const configureStore = () => {
  const middlewares = [];
  const enhancer =
    process.env.NODE_ENV === "production" // 배포 모드 일때 production
      ? compose(applyMiddleware(...middlewares))
      : composeWithDevTools(applyMiddleware(...middlewares)); // redux devtools 사용
  const store = createStore(reducer, enhancer);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === "development",
});

export default wrapper;
