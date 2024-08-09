import express from 'express';

import {getUsers, signinUser,signupUser} from '../controllers/user.js'

const router = express.Router();

router.get('/',getUsers);

router.post("/signin",signinUser);


router.post("/signup",signupUser);


export default router;