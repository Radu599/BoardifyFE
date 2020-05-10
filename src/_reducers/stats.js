import {STATS, USER_LEFT, USER_STATS} from '../_actions/chat';

const initialState = {
    usersArray: []
}

export default function stats(state = initialState, action) {
    switch (action.type) {
        case STATS:
            return {
                ...state,
                usersArray: [...state.usersArray, action.payload]
            }
        default:
            return state;
    }
}
