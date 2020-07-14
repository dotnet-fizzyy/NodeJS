import * as messageController from './controllers/messageController';

const EVENT_NAME = {
    ADD_MESSAGE: 'add_message',
    REMOVE_MESSAGE: 'remove_message',
    DISCONNECT: 'disconnect',
    CONNECT_TO: 'connect_to',
    GET_MESSAGE: 'get_message',
}

export default function socketHandler(io) {
    let connectedClients = [];

    const sendMessage = (clientSocket, message, messageHistory) => {
        const recepient = connectedClients.find(client => client.clientId === message.recepientId);

        if (recepient && io.sockets.connected[recepient.socketId]) {
            io.sockets.connected[recepient.socketId].emit(EVENT_NAME.GET_MESSAGE, messageHistory);
        }

        io.sockets.connected[clientSocket.id].emit(EVENT_NAME.GET_MESSAGE, messageHistory);
    };

    io.on('connection', clientSocket => {
        clientSocket.on(EVENT_NAME.CONNECT_TO, message => connectedClients = [...connectedClients, { clientId: message.clientId, socketId: clientSocket.id }]);

        clientSocket.on(EVENT_NAME.ADD_MESSAGE, async (message) => {
            const messageHistory = await messageController.addMessage(message);
            sendMessage(clientSocket, message, messageHistory);
        });

        clientSocket.on(EVENT_NAME.REMOVE_MESSAGE, async (message) => {
            const messageHistory = await messageController.removeMessage(message);
            sendMessage(clientSocket, message, messageHistory);
        });

        clientSocket.on(EVENT_NAME.DISCONNECT, () => connectedClients = connectedClients.filter(client => client.socketId !== clientSocket.id));
    });
}
