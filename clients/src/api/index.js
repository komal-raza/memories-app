import axios from "axios";
// here we call API for All Operations Related to POSTs
const API = axios.create({ baseURL: "https://memories-app-4yvm.vercel.app/" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token}`;
  }

  return req;
});

// export const fetchPosts = () => API.get("/posts");


export const fetchPosts = (page) => API.get(`/posts?page=${page}`);

                                                                                                                  // &tags=${searchQuery.tags}
export const fetchSearchPost=(searchQuery) =>API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)


export const getPost=(id) => API.get(`/posts/${id}`);

export const createPost = (newPost) => API.post("/posts", newPost);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);

export const deletePost = (id) => API.delete(`/posts/${id}`);

export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const login = (formData) => API.post("/user/signin", formData);

export const signup = (formData) => API.post("/user/signup", formData);
