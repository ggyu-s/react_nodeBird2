export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: "제로초",
      },
      content: "첫 번째 게시글 #해시태그 #익스프레스",
      Images: [
        {
          src:
            "https://cdn.crowdpic.net/detail-thumb/thumb_d_592B8E154069E30E7D76116EF215655F.jpg",
        },
        {
          src:
            "https://previews.123rf.com/images/mtaira/mtaira1612/mtaira161200055/69760183-%EA%B0%80%EB%82%98%EC%9E%90%EC%99%80-%EC%9D%BC%EB%B3%B8%EC%9D%98-%EC%A0%84%ED%86%B5%EC%A0%81%EC%9D%B8-%EC%9D%BC%EB%B3%B8-%ED%92%8D%EA%B2%BD.jpg",
        },
        {
          src:
            "https://previews.123rf.com/images/sepavo/sepavo1708/sepavo170800052/83930497-%EC%98%A4%EC%82%AC%EC%B9%B4-%EC%9D%BC%EB%B3%B8-%ED%92%8D%EA%B2%BD%EA%B3%BC-%EC%84%B1%EC%9E%85%EB%8B%88%EB%8B%A4-.jpg",
        },
      ],
      Comments: [
        {
          User: {
            nickname: "nero",
          },
          content: "이쁘네요~~",
        },
        {
          User: {
            nickname: "japen",
          },
          content: "일본 가고 싶어지네요!!!",
        },
        {
          User: {
            nickname: "gogogogo",
          },
          content: "온천 가고 싶어요~!",
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
};

const ADD_POST = "ADD_POST";

export const addPost = {
  type: ADD_POST,
};

const dummyPost = {
  id: 2,
  content: "더미데이터입니다.",
  User: {
    id: 1,
    nickname: "원처리",
  },
  Images: [],
  Comments: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};
export default reducer;
