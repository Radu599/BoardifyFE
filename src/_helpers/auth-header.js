import {store} from '../_helpers/store'

export function authHeader() {
    // return authorization header with jwt token
    let authentication = store.getState().authentication;
    if (authentication && authentication.jwtToken) {
        return { 'Authorization': 'Bearer ' + authentication.jwtToken };
    } else {
        return {};
    }
}
