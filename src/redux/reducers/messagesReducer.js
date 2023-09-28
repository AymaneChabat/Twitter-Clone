const initialState = []

const messageReducer = (state = initialState, action) => {
    const payload = action.payload
    var i;
    switch(action.type){
        case "GET_MESSAGES":
            return payload.res.status.success === true ? [...state, {chat: payload.chat, messages: payload.res.messages}] : state
            
        case "SEND_MESSAGE":
            i = state.findIndex(messages => messages.chat === payload.chat)
            if (i !== -1) {
                state[i].messages.push(payload.res.message)
            }
            return state
            
        default:
            return state
    }
}


export default messageReducer;