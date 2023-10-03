// Import chat management functions and message-related actions
import { 
    createChats,
    deleteChat,
    getChats,
    checkChat
} from "../../functions/manageChat";
import { sendMessage } from "./messagesActions";

// Action creator to fetch chats
export const fetchChats = (token, last, snapshot) => (dispatch) => {
    // Call the getChats function to retrieve a list of user's chats
    getChats(token, last).then((res) => {
        // Iterate through the retrieved chats
        res[0].forEach((chat) => {
            // Dispatch an action to get user profiles for the chat participants
            dispatch({
                type: "GET_USERS",
                payload: { res: chat.user, tab: "profile" }
            });
            // Remove user data from the chat object
            delete chat.user;
        });
        // Dispatch an action to store the retrieved chats in the state
        dispatch({
            type: "GET_CHATS",
            payload: { chats: res, snapshot: snapshot }
        });
    });
}

// Action creator to add a sample chat
export const addSampleChat = (token, currUser, participant, sample, navigate) => (dispatch) => {
    // Check if a chat with the given participant exists
    checkChat(token, participant).then((res) => {
        if (res.id !== undefined) {
            // If a chat exists, dispatch an action to store it in the state
            dispatch({
                type: "GET_CHATS",
                payload: { chats: [[res]] }
            });
            return res.id;
        } else {
            // If no chat exists, create a new sample chat and dispatch it to the state
            dispatch({
                type: "GET_CHATS",
                payload: {
                    chats: [
                        [
                            {
                                id: "sample" + sample,
                                chat: {
                                    participants: [currUser, participant],
                                    updatedAt: 0
                                }
                            }
                        ]
                    ]
                }
            });
            return "sample" + sample;
        }
    }).then((chat) => {
        // Navigate to the newly created or existing chat
        navigate("/messages/" + chat);
    });
}

// Action creator to create a new chat and send an initial message
export const createChat = (token, user, sample, navigate, message) => (dispatch) => {
    // Create a new chat
    createChats(token, user).then((newChat) => {
        // Navigate to the newly created chat
        navigate("/messages/" + newChat.chat.id);
        // Dispatch an action to add the new chat to the state
        dispatch({
            type: "CREATE_CHAT",
            payload: { newChat, sample }
        });
        return newChat.chat.id;
    }).then((chat) => {
        // Set the chat ID for the initial message and send it
        const m = message;
        m.chatId = chat;
        dispatch(sendMessage(token, m));
    });
}

// Action creator to select an active chat
export const selectChat = (active, ) => (dispatch) => {
    dispatch({
        type: "SELECT_CHAT",
        payload: { active }
    });
}

// Action creator to remove a chat
export const removeChat = (token, id) => (dispatch) => {
    // Delete the chat
    deleteChat(token, id).then((newLast) => {
        // Dispatch an action to update the state with the deleted chat
        dispatch({
            type: "DELETE_CHAT",
            payload: { newLast }
        });
    });
}
