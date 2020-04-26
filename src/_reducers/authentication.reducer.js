import { userConstants } from '../_constants';

const initialState = {
  jwtToken: undefined,
  username: undefined,
  loggedIn: false
}
export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        username: action.payload.username,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        username: action.payload.username,
        jwtToken: action.payload.jwtToken
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state
  }
}
