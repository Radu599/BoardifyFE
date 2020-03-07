import { gameConstants } from '../_constants';
import { gameService } from '../_services';
import { history } from '../_helpers';

export const gameActions = {
    getAllGames
};

function getAllGames() {
    return dispatch => {
        dispatch(request());

        gameService.getAllGames()
            .then(
                games => dispatch(success(games)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: gameConstants.GETALL_GAMES_REQUEST } }
    function success(games) { return { type: gameConstants.GETALL_GAMES_SUCCESS, games } }
    function failure(error) { return { type: gameConstants.GETALL_GAMES_FAILURE, error } }
}
