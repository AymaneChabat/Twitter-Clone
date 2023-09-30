// Function to create a new chat with a user
async function createChats(token, user) {
    try {
        // Send a POST request to create a new chat
        const response = await fetch("http://localhost:9001/api/chat", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                userId: user
            })
        });

        // Successfully created a new chat, log and return the JSON response
        return await response.json();
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

// Function to get a list of user's chats
async function getChats(token, last) {
    try {
        // Send a POST request to fetch a list of user's chats
        const response = await fetch("http://localhost:9001/api/chats", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({ last: last })
        });

        // Successfully fetched user's chats, log and return the JSON response
        return await response.json();
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

// Function to delete a chat by its ID
async function deleteChat(token, chatId) {
    try {
        // Send a DELETE request to delete a chat by its ID
        const response = await fetch("http://localhost:9001/api/chats", {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
            body: JSON.stringify({
                chatId: chatId
            })
        });

        // Successfully deleted the chat, log and return the JSON response
        return await response.json();
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

// Function to send a message in a chat
async function sendMessage(token, message) {
    try {
        // Send a POST request to send a message in a chat
        const response = await fetch("http://localhost:9001/api/message", {
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
        });

        // Successfully sent the message, return the JSON response
        return await response.json();
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

// Function to retrieve messages for a specific chat
async function retrieveMessages(token, chatId) {
    try {
        // Send a GET request to retrieve messages for a specific chat
        const response = await fetch("http://localhost:9001/api/message?chat=" + chatId, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        });

        // Successfully retrieved messages, return the JSON response
        return await response.json();
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

// Function to check if a chat with a specific participant exists
async function checkChat(token, participant) {
    try {
        // Send a GET request to check if a chat with a specific participant exists
        const response = await fetch("http://localhost:9001/api/chat?participant=" + participant, {
            headers: {
                'Authorization': token
            }
        });

        // Successfully checked the chat, return the JSON response
        return await response.json();
    } catch (error) {
        console.error(error.message);
        return null;
    }
}

// Export the chat-related functions
export {
    createChats,
    deleteChat,
    getChats,
    checkChat,
    sendMessage,
    retrieveMessages
}
