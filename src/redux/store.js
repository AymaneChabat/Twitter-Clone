import authReducer from "./reducers/userReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
    user : authReducer
})

export default allReducers