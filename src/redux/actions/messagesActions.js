// Import the message-related functions for sending and retrieving messages
import {
    sendMessage as sendM,
    retrieveMessages,
  } from "../../functions/manageChat";
  
  // Action creator to fetch messages for a specific chat
  export const fetchMessages = (token, chat) => (dispatch) => {
    if (chat.slice(0,6) !== "sample") {
        // Call the retrieveMessages function to fetch messages for the specified chat
        retrieveMessages(token, chat).then((res) => {
            // Check if the fetch messages request was successful
            if (res.success !== false) {
            dispatch({
                type: "GET_MESSAGES",
                payload: { res, chat },
            });
            } else {
            dispatch({
                type: "SET_ERROR",
                payload: "An error has occured while trying to retrieve messages!",
            });
            }
        });
    }
  };
  
  // Action creator to send a message in a chat
  export const sendMessage = (token, message, type) => (dispatch) => {
    if (type === "snapshot") {
      const chat = message.chatId;
      delete message.chatId;
      dispatch({
        type: "SEND_MESSAGE",
        payload: { message, chat: chat },
      });
    } else {
      // Call the sendM function to send the message
      sendM(token, message);
    }
  };
  