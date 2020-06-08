//protocols
export const http = "http://";
export const webSocket = "ws";

//ip
export const ip = "192.168.99.100";
//export const ip = "localhost";

//ports
export const webSocketPort = ":8099";
const defaultGatewayPort = ":8080";
// TODO: replace these with defaultGateway once netflix zuul works on back end for this microservices
const authPort = ":8082";
const userPort = ":8084";
const groupPort = ":8085";
const gamePort = ":8083";

let apiUrl = http + ip;
export const authApiBaseUrl = apiUrl + authPort + "/authenticate";
export const gameApiBaseUrl = apiUrl + gamePort +'/games';
export const userApiBaseUrl = apiUrl + userPort + '/users';
export const groupApiBaseUrl = apiUrl + groupPort + '/groups';
