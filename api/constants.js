//protocols
const http = "http://";
const webSocket = "ws";

//ip
//const ip = "192.168.99.100";
const ip = "localhost";

//ports
const defaultGatewayPort = ":8080";
// TODO: replace these with defaultGateway once netflix zuul works on back end for this microservices
const authPort = ":8082";
const userPort = ":8084";
const groupPort = ":8085";
const gamePort = ":8083";

let apiUrl = http + ip;
export const authApiBaseiUrl = apiUrl + authPort + "/authenticate";
export const gameApiBaseUrl = apiUrl + defaultGatewayPort +'/games';
export const userApiBaseUrl = apiUrl + userPort + '/users';
export const groupApiBaseUrl = apiUrl + groupPort + '/groups';

