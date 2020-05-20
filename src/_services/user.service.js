import {authHeader} from '../_helpers';
import {getFormBody, getRequestOptions} from '../_helpers/requestOptions';
import {getUserDto} from "../_helpers/dto";
import {loginApiUrl, registerApiUrl} from "../../api";
import {userApiBaseUrl} from "../../api/constants";

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    delete: _delete
};

function login(username, password) {

    return fetch(loginApiUrl, getRequestOptions(getFormBody(getUserDto(username, password))))
        .then(handleResponse)
        .then(jwtToken => {
            return {username, jwtToken};
        });
}

function logout() {
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${userApiBaseUrl}`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${userApiBaseUrl}/${id}`, requestOptions).then(handleResponse);
}

function register(user) {

    return fetch(registerApiUrl, getRequestOptions(getFormBody(getUserDto(user.username, user.password)))).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${userApiBaseUrl}/${user.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${userApiBaseUrl}/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
