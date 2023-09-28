import { 
    sendMessage as sendM,
    retrieveMessages
} from "../../functions/manageChat"

export const fetchMessages = (token, chat) => (dispatch) => {
    retrieveMessages(token, chat).then((res)=>{
        dispatch({
            type: "GET_MESSAGES",
            payload: {res, chat}
        })
    })
}

export const sendMessage = (token, message) => (dispatch) => {
    sendM(token, message).then((res)=>{
        dispatch({
            type: "SEND_MESSAGE",
            payload: {res, chat: message.chatId}
        })
    })
}