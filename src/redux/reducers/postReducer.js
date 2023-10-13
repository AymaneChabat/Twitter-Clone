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

    function deletePost(list, defaultState) {
        if (defaultState === undefined) {
            state[list].forEach((user)=>{
                user.posts = user.posts.filter(post => post !== payload.postId)
            })
        } else if (defaultState === "postReplies") {
            const newPostReplies = state[list].filter(post => post.postPath !== payload.postId)
            newPostReplies.forEach((reply)=>{
                reply.replies = reply.replies.filter(rep => rep !== payload.postId)
            })
            state[list] = newPostReplies
        } else if (defaultState === "Replies") {
            state[list].forEach((replies)=>{
                replies.posts = replies.posts.filter(post => post.replyPost !== payload.postId)
                replies.posts.forEach((post, index)=>{
                    if (post.mainPost === payload.postId) {
                        replies.posts[index].mainPost = undefined
                    }
                })
            })
        }
        return state[list]
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
            const profileIndex = state.profile.findIndex(profile => profile.user === payload.user);

            if (profileIndex === -1) {
              // User profile doesn't exist, create a new profile
              const newProfile = {
                user: payload.user,
                posts: cleanPosts().posts,
              };
            
              return {
                ...state,
                profile: [...state.profile, newProfile], // Add new profile to profile array
                posts: [...state.posts, ...payload.posts], // Add new posts to all posts
              };
            } else {
              // User profile exists, update the posts
              const updatedProfile = {
                ...state.profile[profileIndex],
                posts: [...state.profile[profileIndex].posts, ...cleanPosts().posts],
              };
            
              // Update the profile in the profile array
              const updatedProfileArray = [...state.profile];
              updatedProfileArray[profileIndex] = updatedProfile;
            
              return {
                ...state,
                profile: updatedProfileArray, // Update the user's profile
                posts: [...state.posts, ...payload.posts], // Add new posts to all posts
              };
            }

        // Action to get liked posts
        case "LIKES_GET_POSTS":
            // Clean up and prevent duplicate posts
            const likeIndex = state.likes.findIndex(profile => profile.user === payload.user);

            if (likeIndex === -1) {
                // User profile doesn't exist, create a new profile
                const newLikes = {
                    user: payload.user,
                    posts: cleanPosts().posts,
                };
                
                return {
                    ...state,
                    likes: [...state.likes, newLikes], // Add new profile to profile array
                    posts: [...state.posts, ...payload.posts], // Add new posts to all posts
                };
            } else {
                // User profile exists, update the posts
                const updatedLikes = {
                    ...state.likes[likeIndex],
                    posts: [...state.likes[likeIndex].posts, ...cleanPosts().posts],
                };
                
                // Update the profile in the profile array
                const updatedLikesArray = [...state.likes];
                updatedLikesArray[likeIndex] = updatedLikes;

                return {
                    ...state,
                    likes: updatedLikesArray, // Update the user's profile
                    posts: [...state.posts, ...payload.posts], // Add new posts to all posts
                };
            }
            
        // Action to get media posts
        case "MEDIA_GET_POSTS":
            // Clean up and prevent duplicate posts
            posts = cleanPosts();
            posts.posts.reverse();

            const mediaIndex = state.media.findIndex(media => media.user === payload.user)

            if (mediaIndex === -1) {
                const media = posts;

                return {
                    ...state,
                    media: [...state.media, media],  // Add liked posts
                    posts: state.posts  // Add new posts to all posts
                };
            } else {
                state.media[mediaIndex] = {...state.media[mediaIndex], posts: [...state.media[mediaIndex].posts, ...posts.posts]}
            }

            return {
                ...state,
                media: state.media,          // Add media posts
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

            const repliesIndex = state.replies.findIndex(replies => replies.user === payload.user)

            if (repliesIndex === -1) {
                const reply = {user: payload.user, posts: posts};

                return {
                    ...state,
                    replies: [...state.replies, reply],          // Add liked posts
                    posts: state.posts  // Add new posts to all posts
                };
            } else {
                state.replies[repliesIndex] = {...state.replies[repliesIndex], posts: [...state.replies[repliesIndex].posts, ...posts]}
            }

            return {
                ...state,
                replies: state.replies,          // Add liked posts
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
                home: state.home.length > 0 ? [payload.res.post.postPath, ...state.home] : state.home,  // Add the new post to home
                profile: state.profile,                            // Update user's profile posts
                posts: [payload.res.post, ...state.posts],        // Add the new post to all posts
                media: state.media                                 // Update media posts
            };

        // Action to delete a post
        case "DEL_POST":
            const home = state.home.filter(post => post !== payload.postId)
            const following = state.following.filter(post => post !== payload.postId) 
            const newPosts = state.posts.filter(post => post.postPath !== payload.postId)
            const likes = deletePost("likes")
            const media = deletePost("media")
            const profile = deletePost("profile")
            const postReplies = deletePost("postReplies", "postReplies")
            const replies = deletePost("replies", "Replies")
            return {
                ...state,
                home: home,      // Remove from home
                profile: profile,  // Remove from profile
                likes: likes,    // Remove from liked posts
                media: media,
                posts: newPosts,
                following: following,
                postReplies: postReplies,
                replies: replies

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
            var i2 = state.posts.findIndex(post => post.postPath === payload.postPath)
            var i3 = state.replies.findIndex(posts => posts.user === payload.user);
            
            console.log(i3)
            if (i3 !== -1) {
                state.replies[i3] = {...state.replies[i3], posts:[{replyPost: payload.res.postPath, mainPost: payload.postPath}, ...state.replies[i3].posts]}
            }
            // Add the comment to the post's comments list
            state.posts.push(payload.res);
            // Increment comment list
            state.posts[i2].post.comments += 1 
            // Add the comment to the replies
            state.postReplies[i1].replies = [payload.res.postPath, ...state.postReplies[i1].replies]

            return {
                ...state,
                posts: state.posts,    // Update posts
                postReplies: state.postReplies,  // Update replies
                replies: state.replies
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
