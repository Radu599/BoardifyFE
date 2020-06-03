import {gameGroupConstants} from "../_constants/gameGroup.constants";

const initialState = {
    groupId: undefined,
    count: 0,
    gameStarted: false
}

export function gameGroup(state = initialState, action) {
    switch (action.type) {
        case 'USER_JOINED':
        case 'USER_LEFT':
            const us = action.users && action.users.length > 0 ? action.users : [];
            return us;
        case gameGroupConstants.START_GAME:
            let payload = JSON.parse(action.payload);
            return {
                ...state,
                groupId: payload.groupId,
                count: payload.count,
                gameStarted: true
            };
        case gameGroupConstants.JOINED:
            payload = JSON.parse(action.payload);
            return {
                ...state,
                groupId: payload.groupId,
                count: payload.count,
                gameStarted: false
            };
        case gameGroupConstants.SEARCH_GAME:
            return {
                ...state,
            };
        case gameGroupConstants.DISBAND:
            return {
                ...state,
                groupId: -1,
                count: 0,
                gameStarted: false
            };
        case gameGroupConstants.LEAVE_QUEUE:
            if(action.payload === undefined)
                alert('undef');
            console.log(action.payload);
            payload = JSON.parse(action.payload);
            return {
                ...state,
                count: payload.count
            }
        default:
            return state;
    }
    return state;
}
