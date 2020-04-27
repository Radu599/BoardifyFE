import {combineReducers} from 'redux';

import {authentication} from './authentication.reducer';
import {registration} from './registration.reducer';
import {users} from './users.reducer';
import {alert} from './alert.reducer';
import {games} from "./games.reducer";
import {gameGroup} from "./gameGroupReducer";
import messages from './messages';
import TimeReducer from './time';
import UserStatsReducer from './stats';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    games,
    gameGroup,
    messages,
    time: TimeReducer,
    stats: UserStatsReducer
});

export default rootReducer;
