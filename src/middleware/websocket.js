import Singleton from "../_helpers/socket";
import {gameGroupConstants} from "../_constants/gameGroup.constants";
import {CHAT_MESSAGE, USER_LEFT} from "../_actions";

export const WEBSOCKET_CONNECT = 'WEBSOCKET_CONNECT';
export const WEBSOCKET_MESSAGE = 'WEBSOCKET_MESSAGE';
export const WEBSOCKET_SEND = 'WEBSOCKET_SEND';

function factory({messageToActionAdapter}) {

    let socket;

    return ({dispatch}) => {
        return next => action => {
            switch (action.type) {
                case WEBSOCKET_CONNECT:
                    socket = Singleton.getInstance();
                    socket.onmessage = (msg) => {
                        let message = JSON.parse(msg.data);
                        let type = message.type;
                        dispatch({type: type, payload: msg.data});
                    }
                    break;
                case WEBSOCKET_SEND:
                    let payload = action.payload.payload;
                    let messageDto = JSON.stringify({
                        senderEmail: payload.user,
                        message: payload.message,
                        targetGroup: payload.groupId,
                        type: CHAT_MESSAGE
                    });
                    socket = Singleton.getInstance();
                    socket.send(messageDto);
                    break;
                case gameGroupConstants.SEARCH_GAME:
                    messageDto = JSON.stringify({
                        email: action.username,
                        gameId: action.payload.gameId,
                        type: gameGroupConstants.SEARCH_GAME,
                        city: action.payload.city
                    });
                    socket.send(messageDto);
                    break;
                case gameGroupConstants.USER_LEFT:
                    messageDto = JSON.stringify({
                        targetGroup: action.payload.groupId,
                        type: gameGroupConstants.USER_LEFT,
                    });
                    socket.send(messageDto);
                    break;
                case gameGroupConstants.LEAVE_QUEUE:
                    if(action.payload.groupId === undefined) // TODO: idk why action dispatches this 2 time, 2nd time payload is null
                        break;
                    messageDto = JSON.stringify({
                        targetGroup: action.payload.groupId,
                        type: gameGroupConstants.LEAVE_QUEUE,
                    });
                    socket.send(messageDto);
                    break;
                default:
                    break;
            }
            return next(action);
        }
    }
}

export default factory;
