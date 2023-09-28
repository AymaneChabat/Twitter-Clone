const initialState = {chats:[], activeChat: null, last:undefined};

const chatReducer = (state = initialState, action) => {
    const payload = action.payload
    switch(action.type){
        case "GET_CHATS":
            const chats = []
            payload.chats[0].forEach((chat)=>{
                let exist = false
                state.chats.forEach((savedChat)=>{
                    if (chat.id === savedChat.id) {
                        exist = true
                    }
                })
                if (exist === false) {
                    chats.push(chat)
                }
            })
            return {
                ...state,
                chats: [...state.chats, ...chats],
                activeChat: state.activeChat,
                last: payload.chats[1] === null ? state.last : payload.chats[1]
            }
        case "CREATE_CHAT":
            const i = state.chats.findIndex(chat => chat.id === payload.sample)
            state.chats[i] = payload.newChat.chat
            return {
                ...state,
                chats: state.chats,
                activeChat: payload.newChat.chat.id
            }
        case "SELECT_CHAT":
            return {
                ...state,
                activeChat: payload.active
            }
        case "DELETE_CHAT":
            const res = (r1, r2) => (payload.id === state.activeChat && payload.newLast.status.success === true ? r1 : r2)
            const newChats = state.chats.filter(chat => chat.id !== payload.id)
            return {
                ...state,
                chats: res(newChats, state.chats),
                activeChat: res(newChats[0].id, state.activeChat),
                last: res(newChats[newChats.length - 1].id, state.last)
            }
        default:
            return state
    }
}


export default chatReducer;