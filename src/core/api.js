import {Client} from '@stomp/stompjs';

let SockJS = require('sockjs-client/dist/sockjs.js');

const notificationsUrl = `ws://localhost:8081/ws`;

export const webSocketUrl = `${notificationsUrl}`;

const ADD = "ADD";

let token;
let client;

const defaultIssue = {issue: [{error: 'Unexpected error'}]};

const withErrorHandling = fetchPromise => fetchPromise
    .then(response => Promise.all([response.ok, response.json()]))
    .then(([responseOK, responseJson]) => {
        if (responseOK) {
            return responseJson;
        }
        const message = (responseJson || defaultIssue).issue
            .map(it => it.error)
            .join('\n');
        throw new Error(message);
    });

const buildClientSocket = () => {

    client = new Client();
    client.configure({
        appendMissingNULLonIncoming: true,
        logRawCommunication: true,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        webSocketFactory: () => {
            return SockJS(webSocketUrl);
        },
        beforeConnect: () => {
            console.log("trying to connect");
        },
        onStompError: () => {
            console.log("STOMP ERROR");
        },
        onWebSocketError: () => {
            console.log("WS ERROR");
        },
        debug: (str) => {
            console.log(new Date(), str);
        }
    });
};

export const openWebSocket = (callbackAdd = (message) => { console.log(message) }, callbackUpdate = (message) => { console.log(message) } ) => {

    if (!client)
        buildClientSocket();
    client.onConnect = () => {
        client.subscribe('/topic/messages',(message) => {
            message = JSON.parse(message.body);
            if (message.type === ADD)
                callbackAdd(message.entity);
        });
    };
    client.activate();
};

export const closeWebSocket = () => {
    client.deactivate();
};
