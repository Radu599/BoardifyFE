import {gameGroupConstants} from "../_constants/gameGroup.constants";

export function userJoined(users) {
    return {
        type: 'USER_JOINED',
        users: users
    }
}

export function userLeft(users) {
    return {
        type: 'USER_LEFT',
        users: users
    }
}

export function searchGame(username, gameId, city) {

    return {
        username: username,
        type: gameGroupConstants.SEARCH_GAME,
        payload: {gameId, city}
    }
}
