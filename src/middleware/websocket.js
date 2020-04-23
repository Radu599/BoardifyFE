import Singleton from "../_helpers/socket";
import {gameGroupConstants} from "../_constants/gameGroup.constants";
import {CHAT_MESSAGE} from "../_actions";

export const WEBSOCKET_CONNECT = 'WEBSOCKET_CONNECT';
export const WEBSOCKET_MESSAGE = 'WEBSOCKET_MESSAGE';
export const WEBSOCKET_SEND = 'WEBSOCKET_SEND';


class NullSocket {
  send(message){
    console.log(`Warning: send called on NullSocket, dispatch a ${WEBSOCKET_CONNECT} first`);
  }
}

const AppConfig = {
  PROTOCOL: "ws:",
  // TODO: change to localhost if you wish to run it locally
  HOST: "//localhost",
  PORT: ":8081",
}

function factory({messageToActionAdapter}) {
  let socket = new NullSocket();

  return ({dispatch}) => {
    return next => action => {
      switch (action.type) {
        case WEBSOCKET_CONNECT:
          alert("con");
          socket = Singleton.getInstance();
          //socket = new WebSocket(action.payload.url);
          socket.onmessage = (msg) => {
            dispatch(messageToActionAdapter(msg) || { type:WEBSOCKET_MESSAGE, payload: msg.data});
          }
          break;
        case WEBSOCKET_SEND:
          let payload = action.payload.payload;
          console.log("Payload in ws ");
          console.log(action.payload);

          let messageDto = JSON.stringify({ senderEmail: localStorage.getItem("username"), message: payload.message, targetGroup: payload.groupId, type:CHAT_MESSAGE});
          socket = Singleton.getInstance();
          socket.send(messageDto);
          break;
      }
      return next(action);
    }
  }
}
export default factory;

