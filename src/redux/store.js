import authReducer from "./reducers/authReducer";
import chatReducer from "./reducers/chatReducer";
import messageReducer from "./reducers/messagesReducer";
import PostReducer from "./reducers/postReducer";
import userReducer from "./reducers/userReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    currUser: authReducer,
    chats: chatReducer,
    message: messageReducer,
    posts: PostReducer,
    users: userReducer
})

export default allReducers