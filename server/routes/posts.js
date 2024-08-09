import express from 'express';

// Memory Post Routes

import auth from "../middleware/auth.js"
import {getPosts, createPost,updatePost, deletePost, likePost, getPost, getSearchPost} from '../controllers/posts.js';

const router = express.Router();

router.get('/', getPosts);  //fetch posts route
router.post('/',auth,createPost);  //add new posts route
router.patch('/:id',auth, updatePost);  //update posts route by knowing ID
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth,likePost);

router.get('/search', getSearchPost);
router.get("/:id", getPost);
export default router;