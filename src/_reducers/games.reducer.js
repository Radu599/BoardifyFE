import {gameConstants} from '../_constants';

const initialState = {
    game: undefined,
};

let payload;

export function games(state = initialState, action) {
    switch (action.type) {
        case gameConstants.GETALL_GAMES_REQUEST:
            return {
                loading: true
            };
        case gameConstants.GETALL_GAMES_SUCCESS:
            return {
                items: action.games
            };
        case gameConstants.GETALL_GAMES_FAILURE:
            return {
                error: action.error
            };
        case gameConstants.SELECT_GAME:
            return {
                game: action.payload.game
            };
        default:
            return state
    }
}
