import {userConstants} from '../_constants';
import {userService} from '../_services';
import {alertActions} from './';
import {history} from '../_helpers';
import {getGeoCode} from "../_helpers/geoLocation";

export const userActions = {
    login,
    logout,
    register,
    getAll,
    delete: _delete
};

function login(username, password) {

    return dispatch => {
        dispatch(request({username}));

        userService.login(username, password)
            .then(
                jwtToken => {
                    dispatch(success(username, jwtToken));
                    history.push('/home');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(username, jwtToken) {
        return {type: userConstants.LOGIN_REQUEST, payload: {username, jwtToken}}
    }

    function success(username, jwtToken) {
        return {type: userConstants.LOGIN_SUCCESS, payload: {username, jwtToken}}
    }

    function failure(error) {
        return {type: userConstants.LOGIN_FAILURE, error}
    }
}

function logout() {
    return {
        type: userConstants.LOGOUT
    }
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) {
        return {type: userConstants.REGISTER_REQUEST, user}
    }

    function success(user) {
        return {type: userConstants.REGISTER_SUCCESS, user}
    }

    function failure(error) {
        return {type: userConstants.REGISTER_FAILURE, error}
    }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() {
        return {type: userConstants.GETALL_REQUEST}
    }

    function success(users) {
        return {type: userConstants.GETALL_SUCCESS, users}
    }

    function failure(error) {
        return {type: userConstants.GETALL_FAILURE, error}
    }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) {
        return {type: userConstants.DELETE_REQUEST, id}
    }

    function success(id) {
        return {type: userConstants.DELETE_SUCCESS, id}
    }

    function failure(id, error) {
        return {type: userConstants.DELETE_FAILURE, id, error}
    }
}
