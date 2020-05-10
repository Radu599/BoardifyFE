import {STATS} from '../_actions/chat';

const initialState = {}

export default function stats(state = initialState, action) {
    switch (action.type) {
        case STATS:
            let payload = JSON.parse(action.payload);
            let email = payload.email;
            let timestamp = payload.lastMessage;
            let groupId = payload.groupId;
            let messageCount = payload.messageCount;

            return {
                ...state,
                [email]: {lastMessage: timestamp, messageCount: messageCount, email:email}
            }
        default:
            return state;
    }
}
