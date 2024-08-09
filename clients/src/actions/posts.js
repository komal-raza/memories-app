import {FETCH, CREATE, START_LOADING,END_LOADING,UPDATE, DELETE, LIKE, FETCH_POST, FETCH_BY_SEARCH} from '../constants/actionTypes';


import * as api from '../api/index';

// Now we will create actions for
// we are working with async data,to fetch all posts sometime it gonna has to pass by using redux-thunk
export const getPosts = (page) => async (dispatch) => {
  try {
    // data here is the post response from fetch post so we use destruct method here
    const { data:{data,currentPage, numberofPages}} = await api.fetchPosts(page);

    console.log("Fetch all posts", {data,currentPage, numberofPages})
    dispatch({
      type: FETCH,
      payload: { data,currentPage, numberofPages}, //data where we store data
    });
    dispatch({ type: END_LOADING });
  } catch (err) {
    console.log(err);
  }
};

export const getSearchPost =(searchQuery) => async(dispatch)=>{
  try {
    const { data:{data} } = await api.fetchSearchPost(searchQuery);
    console.log("Actions",data)
    dispatch({ type: FETCH_BY_SEARCH, payload:{ data} });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
}

export const getPost = (id) => async(dispatch)=>{
  try{
    dispatch({ type: START_LOADING });
    const {data} = await api.getPost(id);
    dispatch({
      type:FETCH_POST,
      payload:data
    })
    dispatch({ type: END_LOADING });
  }
  catch(error){
    console.log(error);
  }
}

export const createPost = (post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.createPost(post);
    
    dispatch({ type: CREATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.updatePost(id, post);

    dispatch({ type: UPDATE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    //we dont wanna return data so we dont store it in a variable just delete it simply
    await api.deletePost(id);

    dispatch({
      type: DELETE,
      payload: id,
    });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};


export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({ type: START_LOADING });
    const { data } = await api.likePost(id);

    dispatch({ type: LIKE, payload: data });
    dispatch({ type: END_LOADING });
  } catch (error) {
    console.log(error);
  }
};





  //     const action = {
  //         type:FETCH_POSTS,
  //         payload:[]  ///data where we store data
  //     }

  //     // return action;instead of return action we use dispatch action using redux-thunk
  //     dispatch(action);

// we make API requests to POST CRUD Operations

// export const createPost =(post)=> async(dispatch) => {
//     try{
//         const {data} = await api.createPost(post);
//         console.log(data);
//         dispatch({
//             type:CREATE_POST,
//             payload:data
//         });
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// export const createPost = (post) => async (dispatch) => {
//   try {
//     const { data } = await api.createPost(post);

//     dispatch({ type: CREATE_POST, payload: data });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const updatePost = (id,post)=> async(dispatch)=> {
//     try{
//         const {data} = await api.updatePost(id,post);
//         dispatch({ type:UPDATE,
//          payload: data
//         });
//     }
//     catch(err){
//         console.log(err);
//     }
// }

// export const likePost = (id) => async (dispatch) => {
//     try{
//         const { data } = await api.likePost(id);

//         dispatch({ type: LIKE, payload: data });
//     }
//     catch(error){console.log(error)}
// }