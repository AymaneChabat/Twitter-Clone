// Import the message-related functions for sending and retrieving messages
import { 
    sendMessage as sendM,
    retrieveMessages
} from "../../functions/manageChat";

// Action creator to fetch messages for a specific chat
export const fetchMessages = (token, chat) => (dispatch) => {
    // Call the retrieveMessages function to fetch messages for the specified chat
    retrieveMessages(token, chat).then((res) => {
        // Dispatch an action to store the retrieved messages in the state
        dispatch({
            type: "GET_MESSAGES",
            payload: { res, chat }
        });
    });
}

// Action creator to send a message in a chat
export const sendMessage = (token, message) => (dispatch) => {
    // Call the sendM function to send the message
    sendM(token, message).then((res) => {
        // Dispatch an action to store the sent message in the state
        dispatch({
            type: "SEND_MESSAGE",
            payload: { res, chat: message.chatId }
        });
    });
}
