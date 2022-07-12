"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.broadcast = void 0;
const broadcast = (message, clients) => {
    //console.log (clients.length);
    clients.map(e => {
        e.write(`data: ${message}\n\n`);
    });
};
exports.broadcast = broadcast;
//# sourceMappingURL=broadcast.js.map