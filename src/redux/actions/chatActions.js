import { 
    createChats,
    deleteChat,
    getChats,
    checkChat,
    retrieveMessages
} from "../../functions/manageChat"
import { createMessages, sendMessage } from "./messagesActions"

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

export const addSampleChat = (token, currUser, participant, sample, navigate) => (dispatch) => {
    checkChat(token, participant).then(res => {
        if (res.id !== undefined) {
            dispatch({
                type: "GET_CHATS",
                payload: {chats: [[res]]}
            })
            return res.id
        } else {
            dispatch({
                type: "GET_CHATS",
                payload: {chats: [[{id: "sample"+sample, chat: {participants: [currUser, participant], updatedAt: 0}}]]}
            })
            return "sample"+sample
        }
    }).then((chat)=>{
        navigate("/messages/"+chat)
    })
}

export const createChat = (token, user, sample, navigate, message) => (dispatch) => {
    createChats(token, user).then((newChat)=>{
        navigate("/messages/"+newChat.chat.id)
        dispatch({
            type: "CREATE_CHAT",
            payload: {newChat, sample}
        })
        return newChat.chat.id
    }).then((chat)=>{
        const m = message
        m.chatId = chat
        dispatch(sendMessage(token, m))
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
        dispatch({
            type: "DELETE_CHAT",
            payload: {newLast}
        })
    })
}