import axios from 'axios'
// here we call API for All Operations Related to POSTs 
const url = 'https://memories-app-4yvm.vercel.app//posts';
const authApi = 'https://memories-app-4yvm.vercel.app//auth';

export const fetchPosts =()=> axios.get(url);

                                                 
export const createPost = (newPost) => axios.post(url, newPost);

export const updatePost = (id,updatedPost) => axios.patch(`${url}/${id}`, updatedPost);


export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/likePost`);



export const login =(data) => axios.post(authApi,data);

export const signup =(data) => axios.post(authApi,data) 