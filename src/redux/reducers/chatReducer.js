// Define the initial state for the chat reducer
const initialState = { chats: [], activeChat: null, last: undefined };

// Define the chat reducer function
const chatReducer = (state = initialState, action) => {
    // Extract the payload from the action
    const payload = action.payload;
    const localStateChats = state.chats
    // Switch statement to handle different action types
    switch (action.type) {
        case "GET_CHATS":
            // Initialize an array to store new chats
            const chats = [];

            // Iterate through the fetched chats
            payload.chats[0].forEach((chat) => {
                // Check if the chat doesn't exist in the state
                let exist = false;
                localStateChats.forEach((savedChat) => {
                    if (chat.id === savedChat.id) {
                        exist = true;
                    }
                });
                if (exist === false) {
                    chats.push(chat);
                }
            });

            // Update the state with the new chats and other properties
            return {
                ...state,
                chats: [...localStateChats, ...chats],
                activeChat: state.activeChat,
                last: payload.chats[1] === null ? state.last : payload.chats[1],
            };

        case "CREATE_CHAT":
            // Find the index of the chat with the sample ID
            const i = localStateChats.findIndex((chat) => chat.id === payload.sample);

            // Update the chat at the found index with the new chat
            localStateChats[i] = payload.newChat.chat;

            // Update the state with the modified chats and set the active chat
            return {
                ...state,
                chats: localStateChats,
                activeChat: payload.newChat.chat.id,
            };

        case "SELECT_CHAT":
            // Update the state with the selected active chat
            return {
                ...state,
                activeChat: payload.active,
            };

        case "DELETE_CHAT":
            // Define a helper function to conditionally return values
            const res = (r1, r2) =>
                payload.id === state.activeChat ? r1 : r2;

            // Filter out the chat with the specified ID from the chats
            const newChats = localStateChats.filter((chat) => chat.id !== payload.id);


            // Update the state based on the conditionally returned values
            return {
                ...state,
                chats: newChats,
                activeChat: res(null, state.activeChat),
                last: res(newChats.length > 0 ? newChats[newChats.length - 1].id : undefined, state.last),
            };

        default:
            // Return the current state for unknown action types
            return state;
    }
};

// Export the chat reducer as the default export
export default chatReducer;
