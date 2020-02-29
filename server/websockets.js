const webSocketBuilder = require('ws');
var connectedClients = {};

const webSocket = new webSocketBuilder.Server({ port: 5001 });

webSocket.on("connection", (ws, request) => {
    const userId = request.url.substring(1, request.url.length); //gonna pass session id
    connectedClients[userId] = ws;

    checkIfCompanionConnected(ws); //check for first time

    setInterval(() => {
        checkIfCompanionConnected(ws); //check each 5 sec
    }, 5000);

    ws.on("message", message => {
        let parsedMessage = JSON.parse(message);
        let receivedData = new UserResponse(
            parsedMessage.fromUser,
            parsedMessage.toUser,
            parsedMessage.message
        );
        let userSocket = connectedClients[receivedData.toUser];

        if (userSocket && userSocket.readyState === webSocketBuilder.OPEN) {
            userSocket.send(stringifyObjectToJson(receivedData));
        }

        ws.send(stringifyObjectToJson(receivedData));
    });

    ws.on("close", () => {
        delete connectedClients[userId];
    });
});

class UserResponse {
    constructor(fromUser, toUser, message) {
        this.fromUser = fromUser;
        this.toUser = toUser;
        this.message = message;
    }
}

function checkIfCompanionConnected(ws) {
    let userSocket = connectedClients['user2']; //mocked until data will not come from database 
    if (userSocket) ws.send(stringifyObjectToJson({ status: 1 }));
    else ws.send(stringifyObjectToJson({ status: 2 }));
}

function stringifyObjectToJson(obj) {
    return JSON.stringify(obj);
}