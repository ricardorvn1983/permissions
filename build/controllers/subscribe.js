"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribe = void 0;
const clients_1 = require("../services/broadcast/clients");
const subscribe = (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    (0, clients_1.addClient)(res);
    (0, clients_1.broadcastMsg)('info', 'connected', "{}");
    console.log("conectado");
};
exports.subscribe = subscribe;
//# sourceMappingURL=subscribe.js.map