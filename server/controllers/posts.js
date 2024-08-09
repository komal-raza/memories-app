import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getSearchPost = async (req, res) => {
  const { searchQuery } = req.query;

  console.log(searchQuery,"SEarch query");
  
  try {
    const title = new RegExp(searchQuery, "i");
    // const posts = await postMessage.find({ $or: [{ title }, {tags:{$in:tags.spliy(',')}}] });
//,{tags:{$in:tags.split(',')}}
    const posts = await PostMessage.find({ $or: [{ title } ] });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: "No such post found" });
    console.log(error);
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await PostMessage.findById(id);
    res.status(200).json(post);
  } catch (error) {
    console.log(error)
  }
};

// Get All Post from DB

export const getPosts = async (req, res) => {
  const { page } = req.query; //when a number pass to query it become a string

  try {
    const LIMIT = 5;
    // convert page string to number

    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const Total = await PostMessage.countDocuments({});
    const posts = await PostMessage.find()
      .sort({ _id: -1 })
      .limit(LIMIT)
      .skip(startIndex);

    res.status(200).json({
      data: posts,
      currentPage: Number(page),
      numberofPages: Math.ceil(Total / LIMIT),
    });
  } catch (err) {
    res.status(404).json({ messge: "No post found" });
    console.log(err.message);
  }
};

// Crete Post from frontside to backend

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });
  try {
    await newPost.save();

    res.status(200).json({ message: "Post created successfully" });
  } catch (err) {
    res.status(409).json({ message: "Post not created" });
  }
};

// Updated Post from  client to server

export const updatePost = async (req, res) => {
  //rename properties during destruction  id to _id
  const { id: _id } = req.params; // extract id from
  const post = req.body; //sent from frontend
  // first we validate the id by using this check
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json("No post with this id exists");
  }
  // else we updated the post
  const updatedPost = await PostMessage.findByIdAndUpdate(
    _id,
    { ...post, _id },
    {
      new: true,
    }
  );
  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  //rename properties during destruction  id to _id
  const { id } = req.params; // extract id from

  // first we validate the id by using this check
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json("No post with this id exists");
  }
  // else we updated the post
  await PostMessage.findByIdAndRemove(id);
  res.json("Delete Post Successfully");
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId)
    return res.status(409).json({ message: "Unauthorized user" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);
  const index = await post.likeCount.findIndex(
    (id) => id === String(req.userId)
  );

  if (index === -1) {
    post.likeCount.push(req.userId);
  } else {
    post.likeCount = post.likeCount.filter((id) => {
      id !== String(req.userId);
    });
  }

  const updatedPost = await PostMessage.findByIdAndUpdate(id, post, {
    new: true,
  });

  res.json(updatedPost);
};
