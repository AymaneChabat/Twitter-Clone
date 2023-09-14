
// Function to create a new chat with a user
/*
async function createChats(token, user) {
    return await fetch("http://localhost:9001/api/chat", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            userId: user
        })
    }).then(async (res)=>{
        // Successfully created a new chat, log and return the JSON response
        return await res.json()
    })
}

// Function to get a list of user's chats
async function getChats(token, last) {
    return await fetch("http://localhost:9001/api/chats", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({last: last})
    }).then(async (res)=>{
        // Successfully fetched user's chats, log and return the JSON response
        return await res.json()
    })
}

// Function to delete a chat by its ID
async function deleteChat(token, chatId) {
    return await fetch("http://localhost:9001/api/chats", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }, 
        body: JSON.stringify({
            chatId: chatId
        })
    }).then(async (res)=>{
        // Successfully deleted the chat, log and return the JSON response
        return await res.json()
    })
}

// Function to send a message in a chat
async function sendMessage(token, message) {
    return await fetch("http://localhost:9001/api/message", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            chat: message.chatId,
            content: message.content,
            media: message.media
        })
    }).then(async (res)=>{
        // Successfully sent the message, return the JSON response
        return await res.json()
    })
}

async function retrieveMessages(token, chatId) {
    return await fetch("http://localhost:9001/api/message?chat="+chatId, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    }).then(async (res)=>{
        // Successfully sent the message, return the JSON response
        return await res.json()
    })
}
*/
async function createChats(token, user) {
    return await fetch("https://xclone-api.vercel.app/api/chat", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            userId: user
        })
    }).then(async (res)=>{
        // Successfully created a new chat, log and return the JSON response
        return await res.json()
    })
}

// Function to get a list of user's chats
async function getChats(token, last) {
    return await fetch("https://xclone-api.vercel.app/api/chats", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({last: last})
    }).then(async (res)=>{
        // Successfully fetched user's chats, log and return the JSON response
        return await res.json()
    })
}

// Function to delete a chat by its ID
async function deleteChat(token, chatId) {
    return await fetch("http://localhost:9001/api/chats", {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        }, 
        body: JSON.stringify({
            chatId: chatId
        })
    }).then(async (res)=>{
        // Successfully deleted the chat, log and return the JSON response
        return await res.json()
    })
}

// Function to send a message in a chat
async function sendMessage(token, message) {
    return await fetch("https://xclone-api.vercel.app/api/message", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify({
            chat: message.chatId,
            content: message.content,
            media: message.media
        })
    }).then(async (res)=>{
        // Successfully sent the message, return the JSON response
        return await res.json()
    })
}

async function retrieveMessages(token, chatId) {
    return await fetch("https://xclone-api.vercel.app/api/message?chat="+chatId, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': token
        },
    }).then(async (res)=>{
        // Successfully sent the message, return the JSON response
        return await res.json()
    })
}


  export {
    createChats,
    deleteChat,
    getChats,
    sendMessage,
    retrieveMessages
}