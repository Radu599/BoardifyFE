import {MESSAGE_RECEIVED} from '../_actions/chat';
const initialState = [];
export default function(state = initialState, action){
  switch(action.type){
      case MESSAGE_RECEIVED:
          console.log("I FUCKING RECIEVED THE MESSAGE");
          console.log(state);
          return [...state, action.payload];
      default: return state;
  }
}
