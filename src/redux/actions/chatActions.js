import { 
    createChats,
    deleteChat,
    getChats
} from "../../functions/manageChat"

export const fetchChats = (token, last, snapshot) => (dispatch) => {
    getChats(token, last).then((res)=>{
        res[0].forEach((chat)=>{
            dispatch({
                type:"GET_USERS",
                payload: {res: chat.user, tab: "profile"}
            })
            delete chat.user
        })
        dispatch({
            type: "GET_CHATS",
            payload: {chats: res, snapshot: snapshot}
        })
    })
}

export const createChat = (token, user) => (dispatch) => {
    createChats(token, user).then((newChat)=>{
        dispatch({
            type: "CREATE_CHAT",
            payload: {newChat}
        })
    })
}

export const selectChat = (active) => (dispatch) => {
    dispatch({
        type: "SELECT_CHAT",
        payload: {active}
    })
}

export const removeChat = (token, id) => (dispatch) => {
    deleteChat(token, id).then((newLast)=>{
        console.log(newLast)
        dispatch({
            type: "DELETE_CHAT",
            payload: {newLast}
        })
    })
}