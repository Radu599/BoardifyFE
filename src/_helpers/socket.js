import {ip, webSocket, webSocketPort} from "../../api";

const AppConfig = {
    PROTOCOL: webSocket + ":",
    // TODO: change to localhost if you wish to run it locally
    HOST: "//" + ip,
    PORT: webSocketPort,
}

const Singleton = (function () {
    let instance;

    function createInstance() {

        const socket = new WebSocket(AppConfig.PROTOCOL + AppConfig.HOST + AppConfig.PORT);
        return socket;
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        }
    };

})();

export default Singleton;
