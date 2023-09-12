import authReducer from "./reducers/authReducer";
import chatReducer from "./reducers/chatReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    user: authReducer,
    chats: chatReducer
})

export default allReducers