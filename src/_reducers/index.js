import {combineReducers} from 'redux';
import {authentication} from './authentication.reducer';
import {registration} from './registration.reducer';
import {users} from './users.reducer';
import {alert} from './alert.reducer';
import {games} from "./games.reducer";
import {gameGroup} from "./gameGroupReducer";
import messages from './messages';
import TimeReducer from './time';
import stats from "./stats";
import {userConstants} from "../_constants";

const appReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    games,
    gameGroup,
    messages,
    time: TimeReducer,
    stats
});

const rootReducer = (state, action) => {
    if (action.type === userConstants.LOGOUT) {
        localStorage.removeItem('state')
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer;
