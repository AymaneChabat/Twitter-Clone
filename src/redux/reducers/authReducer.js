// Define the initial state for the authentication reducer
const initialState = { user: null, token: null };

// Define the authentication reducer function
const authReducer = (state = initialState, action) => {
  // Extract the payload from the action
  let payload = action.payload;

  // Switch statement to handle different action types
  switch (action.type) {
    case "CHECK_USER":
    case "SIGN_IN":
    case "SIGN_UP":
      // Update the state with user and token information from the payload
      return {
        ...state,
        user: payload.user,
        token: payload.token,
      };
    case "SIGN_OUT":
      // Reset the state to the initial state when the user signs out
      return initialState;
    default:
      // Return the current state for unknown action types
      return state;
  }
};

// Export the authentication reducer as the default export
export default authReducer;
