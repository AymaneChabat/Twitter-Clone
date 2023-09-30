// Define the initial state for the user reducer with different categories
const initialState = {
    activeprofiles: [],  // Active user profiles
    users: [],           // Users
    explore: []          // Users for exploration
};

// Define the userReducer function
const userReducer = (state = initialState, action) => {
    // Extract the payload from the action
    let payload = action.payload;
    var i;

    // Switch statement to handle different action types
    switch (action.type) {
        // Action to get user profiles or search results
        case 'GET_USERS':
            return {
                ...state,
                users: payload.tab === "search" ? payload.res : state.users,  // Update users for search
                activeprofiles: payload.tab === "profile" && state.activeprofiles.find(profile => profile.info.username === payload.res.info.username) === undefined ?
                    [...state.activeprofiles, payload.res] : state.activeprofiles,  // Add active user profiles
                explore: payload.tab === "explore" ? [...state.explore, ...payload.res] : state.explore  // Add users for exploration
            };

        // Action to update user information
        case 'UPDATE_USER':
            return {
                ...state,
                activeprofiles: [
                    ...state.activeprofiles.filter(user => user.id !== payload.res.id),
                    payload.res
                ]
            };

        // Action to update followers and following
        case 'UPDATE_FOLLOWS':
            // Find the index of the user whose followers/following are being updated
            const index = state.activeprofiles.findIndex(user => user.id === payload.res.user);

            // Find the index of the current user who initiated the follow/unfollow action
            i = state.activeprofiles.findIndex(user => user.id === payload.currUser);

            // Initialize variables to store new followers and following lists
            let newFollowers;
            let newFollowing;

            // Check if the action is to increment (follow) or decrement (unfollow)
            if (payload.res.action === "increment") {
                // If it's a follow action, add the current user to the user's followers
                newFollowers = [payload.currUser, ...state.activeprofiles[index].info.followers];

                // Add the user to the current user's following list
                newFollowing = [payload.res.user, ...state.activeprofiles[i].info.following];
            } else {
                // If it's an unfollow action, remove the current user from the user's followers
                newFollowers = state.activeprofiles[index].info.followers.filter(user => user !== payload.currUser);

                // Remove the user from the current user's following list
                newFollowing = state.activeprofiles[i].info.following.filter(user => user !== payload.res.user);
            }

            // Update the user's followers and following lists with the new values
            state.activeprofiles[index].info.followers = newFollowers;
            state.activeprofiles[i].info.following = newFollowing;

            // Return the updated state
            return {
                ...state,
                activeprofiles: state.activeprofiles
            };

        // Action to update liked posts
        case 'UPDATE_LIKES':
            // Find the index of the user whose likes are being updated
            i = state.activeprofiles.findIndex(user => user.id === payload.user);

            // Check if the user already likes the post
            if (state.activeprofiles[i].info.likes.includes(payload.postId)) {
                // If the user likes the post, remove the like by filtering it out
                var newLikes = state.activeprofiles[i].info.likes.filter(like => like !== payload.postId);
            } else {
                // If the user does not like the post, add the like to the list
                var newLikes = state.activeprofiles[i].info.likes;
                newLikes.push(payload.postId);
            }

            // Update the user's liked posts with the new list of likes
            state.activeprofiles[i].info.likes = newLikes;

            // Return the updated state
            return state;
            
        default:
            return state;
    }
};

// Export the userReducer as the default export
export default userReducer;
