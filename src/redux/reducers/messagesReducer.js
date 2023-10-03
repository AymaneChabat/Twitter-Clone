// Define the initial state for the message reducer as an empty array
const initialState = [];

// Define the message reducer function
const messageReducer = (state = initialState, action) => {
    // Extract the payload from the action
    const payload = action.payload;

    // Declare a variable to store the index
    var i;

    // Switch statement to handle different action types
    switch (action.type) {
        case "GET_MESSAGES":
            // Check if the fetch messages request was successful
            if (payload.res.status.success === true) {
                // Append the chat and its messages to the state
                return [...state, { chat: payload.chat, messages: payload.res.messages }];
            } else {
                // If the request was not successful, return the current state
                return state;
            }

        case "SEND_MESSAGE":
            // Find the index of the chat in the state
            i = state.findIndex((messages) => messages.chat === payload.chat);

            // Check if the chat is found in the state
            if (i !== -1) {
                // Push the sent message to the chat's messages
                state[i].messages.push(payload.message);
            }

            // Return the updated state
            return state;

        default:
            // Return the current state for unknown action types
            return state;
    }
};

// Export the message reducer as the default export
export default messageReducer;
