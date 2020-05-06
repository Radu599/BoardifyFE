import {CHAT_MESSAGE} from '../_actions/chat';

const initialState = {
    messageArray: []
}

export default function messages(state = initialState, action) {
    switch (action.type) {
        case CHAT_MESSAGE:
            return {
                ...state,
                messageArray: [...state.messageArray, action.payload]
            }
        default:
            return state;
    }
}
