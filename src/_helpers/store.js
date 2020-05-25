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
        console.log("serialized state");
        console.log(state);
        console.log(serializedState);
        localStorage.setItem('state', serializedState);
        console.log("SAVE STATE");
        console.log(localStorage.getItem('state'));
    } catch (e) {
        console.log("ERROR SAVE");
        console.log(e)
    }
}

function loadFromLocalStorage() {
    try {
        console.log("LOAD STATE");
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState)
    } catch (e) {
        console.log(e);
        return undefined;
    }
}

const persistedState = loadFromLocalStorage();
console.log("PERSIST");
console.log(persistedState);
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
