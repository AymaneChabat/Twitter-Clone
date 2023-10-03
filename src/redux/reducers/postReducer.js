// Define the initial state for the post reducer with different categories
const initialState = {
    home: [],       // Posts displayed on the home page
    profile: [],    // Posts displayed on a user's profile
    likes: [],       // Posts liked by the user
    following: [],   // Posts from users the user is following
    replies: [],    // Replies from user
    postReplies: [],     // Replies to posts
    media: [],       // Media posts
    posts: []        // All posts
};

// Define the PostReducer function
const PostReducer = (state = initialState, action) => {
    // Extract the payload from the action
    const payload = action.payload;
    var posts = [];

    // Helper function to clean up posts and prevent duplicates
    function cleanPosts() {
        for (let index = payload.posts.length - 1; index >= 0; index--) {
            const element = payload.posts[index];
            posts.push(element.postPath);

            if (state.posts.find(post => post.postPath === element.postPath) !== undefined) {
                payload.posts.splice(index, 1);
            }
        }

        return { user: payload.user, posts: posts.reverse() };
    }

    // Helper function to clean up posts and prevent duplicates
    function cleanPostsVoid() {
        for (let index = payload.length - 1; index >= 0; index--) {
            const element = payload[index];
            posts.push(element.postPath);

            // Remove duplicates from the payload
            if (state.posts.find(post => post.postPath === element.postPath) !== undefined) {
                payload.splice(index, 1);
            }
        }
    }

    // Switch statement to handle different action types
    switch (action.type) {
        // Action to get posts for the home page
        case "HOME_GET_POSTS":
            // Clean up and prevent duplicate posts
            cleanPostsVoid()

            return {
                ...state,
                home: [...state.home, ...posts.reverse()],  // Append new posts to home
                posts: [...state.posts, ...payload]         // Add new posts to all posts
            };

        // Action to get posts from users the user is following
        case "FOLLOWING_GET_POSTS":
            // Clean up and prevent duplicate posts
            cleanPostsVoid()

            return {
                ...state,
                following: [...state.following, ...posts.reverse()],  // Append new posts to following
                posts: [...state.posts, ...payload]                     // Add new posts to all posts
            };

        // Action to get posts for a user's profile
        case "PROFILE_GET_POSTS":
            // Clean up and prevent duplicate posts
            posts = cleanPosts();

            return {
                ...state,
                profile: [...state.profile, posts],        // Add user's posts to profile
                posts: [...state.posts, ...payload.posts]  // Add new posts to all posts
            };

        // Action to get liked posts
        case "LIKES_GET_POSTS":
            // Clean up and prevent duplicate posts
            posts = cleanPosts();

            return {
                ...state,
                likes: [...state.likes, posts],          // Add liked posts
                posts: [...state.posts, ...payload.posts]  // Add new posts to all posts
            };

        // Action to get media posts
        case "MEDIA_GET_POSTS":
            // Clean up and prevent duplicate posts
            posts = cleanPosts();
            posts.posts.reverse()
            return {
                ...state,
                media: [...state.media, posts],          // Add media posts
                posts: [...state.posts, ...payload.posts]  // Add new posts to all posts
            };

        // Action to get replies made by the user
        case "REPLIES_GET_POSTS":
            for (let index = payload.posts.length - 1; index >= 0; index--) {
                const reply = payload.posts[index].replyPost;
                const parent = payload.posts[index].mainPost;
                posts.push({replyPost: reply.postPath, mainPost: parent.postPath});
    
                if (state.posts.find(post => post.postPath === reply.postPath) === undefined) {
                    state.posts.push(reply)
                }
                if (state.posts.find(post => post.postPath === parent.postPath) === undefined) {
                    state.posts.push(parent)
                }
            }
    
            const reply = {user: payload.user, posts: posts};

            return {
                ...state,
                replies: [...state.replies, reply],          // Add liked posts
                posts: state.posts  // Add new posts to all posts
            };

        // Action to get replies to posts
        case 'POST_GET_REPLIES':
            
            // Clean up and prevent duplicate posts
            for (let index = payload.replies.length - 1; index >= 0; index--) {
                const element = payload.replies[index];
                posts.push(element.postPath);
    
                // Remove duplicates from the payload
                if (state.posts.find(post => post.postPath === element.postPath) !== undefined) {
                    payload.replies.splice(index, 1);
                }
            }
            
            return {
                ...state,
                postReplies: [...state.following, {...payload , replies: [...posts.reverse()]}],  // Append new posts to following
                posts: [...state.posts, ...payload.replies]         // Add new posts to all posts
            };

        // Action to create a new post
        case "CREATE_POST":
            let oldPosts = state.profile.find(posts => posts.user === payload.user);
            let index;

            // Update the user's profile posts if they exist
            if (oldPosts !== undefined) {
                oldPosts = { ...oldPosts, posts: [payload.res.post.postPath, ...oldPosts.posts] };
                index = state.profile.findIndex(posts => posts.user === payload.user);
                state.profile[index] = oldPosts;
            }

            // Update media posts if the new post has media
            if (payload.res.post.post.media.length > 0 && state.media.findIndex(posts => posts.user === payload.user) !== -1) {
                index = state.media.findIndex(posts => posts.user === payload.user);
                state.media[index].posts = [payload.res.post.postPath, ...state.media[index].posts];
            }

            return {
                ...state,
                home: [payload.res.post.postPath, ...state.home],  // Add the new post to home
                profile: state.profile,                            // Update user's profile posts
                posts: [payload.res.post, ...state.posts],        // Add the new post to all posts
                media: state.media                                 // Update media posts
            };

        // Action to delete a post
        case "DEL_POST":
            return {
                ...state,
                home: state.home.filter(post => post.id !== payload.id),      // Remove from home
                profile: state.profile.filter(post => post.id !== payload.id),  // Remove from profile
                // likes: state.likes.filter(post => post.id != payload.id)    // Remove from liked posts (if needed)
            };

        // Action to like or unlike a post
        case "LIKE_POST":
            var i1 = state.likes.findIndex(post => post.user === payload.user);
            var i2 = state.posts.findIndex(post => post.postPath === payload.postId);
            console.log(payload)

            // Update liked posts
            if (i1 !== -1) {
                if (state.likes[i1].posts.includes(payload.postId)) {
                    var newLikes = state.likes[i1].posts.filter(like => like !== payload.postId);
                } else {
                    var newLikes = [payload.postId, ...state.likes[i1].posts];
                }
                state.likes[i1].posts = newLikes;
            }

            // Update the post's like count
            if (payload.action === "decrement") {
                state.posts[i2].post.likes -= 1;
            } else {
                state.posts[i2].post.likes += 1;
            }

            return {
                ...state,
                posts: state.posts,  // Update posts
                likes: state.likes   // Update liked posts
            };

        // Action to comment on a post
        case "COMMENT_POST":
            var i1 = state.postReplies.findIndex(post => post.postPath === payload.postPath);

            // Add the comment to the post's comments list
            state.posts.push(payload.res);

            // Add the comment to the replies
            state.postReplies[i1].replies = [payload.res.postPath, ...state.postReplies[i1].replies]

            return {
                ...state,
                posts: state.posts,    // Update posts
                postReplies: state.postReplies  // Update replies
            };

        // Action to add a single post
        case "POST":
            return {
                ...state,
                posts: [...state.posts, payload]  // Add the new post to all posts
            };

        default:
            return state;
    }
};

// Export the PostReducer as the default export
export default PostReducer;
