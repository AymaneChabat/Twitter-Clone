// Function to add a new post
async function addPost(data, token) {
    const formData = new FormData();

    formData.append("content", data["content"])

    data.images.forEach(element => {
        formData.append("images", element);
    });

    return await fetch("http://localhost:9001/api/post", {
        method: "POST",
        headers: {
            'Authorization': token
        },
        body: formData
    }).then(async (res)=>{
        // Successfully added a new post, return the JSON response
        return await res.json()
    })
}

// Function to get a list of posts
async function getPost(post, tab, last, username) {
    return await fetch("http://localhost:9001/api/post?tab="+tab+(last !== undefined ? "&last="+last : "")+(post !== undefined ? "&post="+post : "")+(username !== undefined ? "&username="+username : ""), {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
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


// Function to update a post by its ID
async function updatePost(token, postId) {
    return await fetch("http://localhost:9001/api/post/"+postId, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }
    }).then(async (res)=>{
        // Successfully deleted the post, log and return the JSON response
        return await res.json()
    })
}

// Function to add a reply
async function postReply(data, token, post, username) {
    const formData = new FormData();

    formData.append("content", data["content"])

    data.images.forEach(element => {
        formData.append("images", element);
    });

    return await fetch("http://localhost:9001/api/"+username+"/post/"+post, {
        method: "POST",
        headers: {
            'Authorization': token
        },
        body: formData
    }).then(async (res)=>{
        // Successfully added a new post, return the JSON response
        return await res.json()
    })
}

async function getReplies(token, post, username) {
    return await fetch("http://localhost:9001/api/"+username+"/replies/"+post, {
        method: "GET",
        headers: {
            'Authorization': token
        }
    }).then(async (res)=>{
        // Successfully added a new post, return the JSON response
        return await res.json()
    })
}

export {
    addPost,
    deletePost,
    getPost,
    updatePost,
    postReply,
    getReplies
}