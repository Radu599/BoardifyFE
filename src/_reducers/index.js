import {combineReducers} from 'redux';

import {authentication} from './authentication.reducer';
import {registration} from './registration.reducer';
import {users} from './users.reducer';
import {alert} from './alert.reducer';
import {games} from "./games.reducer";
import {gameGroup} from "./gameGroupReducer";
import MessagesReducer from './messages';
import TimeReducer from './time';

const rootReducer = combineReducers({
    authentication,
    registration,
    users,
    alert,
    games,
    gameGroup,
    messages: MessagesReducer,
    time: TimeReducer,
});

export default rootReducer;
