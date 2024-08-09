import { combineReducers } from "redux";

import {posts} from './posts';
import {auth} from './auth'

    // put all reducers here

export default combineReducers({
    posts,
    auth
})