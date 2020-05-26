import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from '../_reducers';
import {messageToActionAdapter} from "../_actions";
import websocket from "../middleware/websocket";

const loggerMiddleware = createLogger();

function saveToLocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (e) {
        //TODO:
    }
}

function loadFromLocalStorage() {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState)
    } catch (e) {
        return undefined;
    }
}

const persistedState = loadFromLocalStorage();
export const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware,
        websocket({messageToActionAdapter})
    )
);

store.subscribe(() => saveToLocalStorage(store.getState()))
