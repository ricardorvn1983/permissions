"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastMsg = exports.removeClient = exports.addClient = void 0;
let clients = [];
const addClientDisconnectListener = (client) => {
    client.on('close', () => {
        console.log(`Client closed connection`);
        (0, exports.removeClient)(client);
        client.end();
    });
};
const addClient = (client) => {
    clients.push(client);
    addClientDisconnectListener(client);
};
exports.addClient = addClient;
const removeClient = (client) => {
    clients.splice(clients.indexOf(client), 1);
};
exports.removeClient = removeClient;
const broadcastMsg = (event, action, data) => {
    clients.map(client => {
        client.write(`event: ${event}\ndata: {"action":"${action}","data": ${data}}\n\n`);
    });
};
exports.broadcastMsg = broadcastMsg;
//# sourceMappingURL=clients.js.map