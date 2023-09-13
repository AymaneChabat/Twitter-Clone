import authReducer from "./reducers/authReducer";
import chatReducer from "./reducers/chatReducer";
import messageReducer from "./reducers/messagesReducer";
import PostReducer from "./reducers/postReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    user: authReducer,
    chats: chatReducer,
    message: messageReducer,
    posts: PostReducer
})

export default allReducers