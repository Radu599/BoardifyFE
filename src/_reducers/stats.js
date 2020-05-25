import {STATS} from '../_actions/chat';

const initialState = {}

const DEFAULT_AVATAR = '//ssl.gstatic.com/accounts/ui/avatar_2x.png';

export default function stats(state = initialState, action) {
    switch (action.type) {
        case STATS:
            let payload = JSON.parse(action.payload);
            let email = payload.email;
            let timestamp = payload.lastMessage;
            let groupId = payload.groupId;
            let messageCount = payload.messageCount;
            const avatar = email ? encodeURI(`https://robohash.org/${email.toLowerCase()}.png`) : DEFAULT_AVATAR;

            return {
                ...state,
                [email]: {lastMessage: timestamp, messageCount: messageCount, email:email, avatar: avatar}
            }
        default:
            return state;
    }
}
