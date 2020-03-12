import { gameConstants } from '../_constants';
export function games(state = {}, action) {
    switch (action.type) {
        case gameConstants.GETALL_GAMES_REQUEST:
            return {
                loading: true
            };
        case gameConstants.GETALL_GAMES_SUCCESS:
            console.log("search games starting with: " + state.searchText);

            return {
                items: action.games
            };
        case gameConstants.GETALL_GAMES_FAILURE:
            return {
                error: action.error
            };

        default:
            return state
    }
}
