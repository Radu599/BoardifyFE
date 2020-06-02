import {CHAT_MESSAGE} from '../_actions/chat';
import {gameGroupConstants} from "../_constants/gameGroup.constants";

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
        case gameGroupConstants.DISBAND:
            return {
                messageArray: []
            }
        default:
            return state;
    }
}
