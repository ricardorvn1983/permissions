"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcastMsg = void 0;
const clients_1 = require("../broadcast/clients");
const broadcastMsg = (message) => {
    clients_1.clients.map(client => {
        client.write(`data: ${message}\n\n`);
    });
};
exports.broadcastMsg = broadcastMsg;
//# sourceMappingURL=broadcast.js.map