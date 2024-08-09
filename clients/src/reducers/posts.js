// post reducers

import {FETCH, CREATE, START_LOADING,END_LOADING,UPDATE, DELETE, LIKE, FETCH_POST, FETCH_BY_SEARCH} from "../constants/actionTypes";
// here state = posts

const initialState = {
  posts: [],
  isLoading:true
};

export const posts = (state = initialState, action) => {

  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case CREATE:
      return { ...state.posts, posts: [...state.posts, action.payload] };

    case FETCH:
      console.log({ ...state, posts: action.payload.data });
      return {
        ...state,
        posts: action.payload.data,
        curentPage: action.payload.currentPage,
        numberofPages: action.payload.numberofPages,
      };

    case FETCH_BY_SEARCH:
     
      return { ...state, posts: action.payload.data };

    case FETCH_POST:
     
      return { ...state, post: action.payload };

    case LIKE:
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case UPDATE:
      // first we will find the id of post then map over all post to match same id and then return update post to it otherwise return same post
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };

    case DELETE:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== action.payload),
      };
    default:
      return state;
  }
};
