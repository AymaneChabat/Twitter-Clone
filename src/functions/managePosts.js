// Function to add a new post
async function addPost(data, token) {
    return await fetch("http://localhost:9001/api/post", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(data)
    }).then(async (res)=>{
        // Successfully added a new post, return the JSON response
        return await res.json()
    })
}

// Function to get a list of posts
async function getPost(token) {
    return await fetch("http://localhost:9001/api/post", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then(async (res)=>{
        // Successfully fetched a list of posts, return the JSON response
        return await res.json()
    })
}

// Function to delete a post by its ID
async function deletePost(token, postId) {
    console.log(await fetch("http://localhost:9001/api/post", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({id: postId})
    }).then(async (res)=>{
        // Successfully deleted the post, log and return the JSON response
        return await res.json()
    }))
}

export default {
    addPost,
    deletePost,
    getPost
}