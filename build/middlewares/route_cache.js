"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appliedCache = exports.cache = void 0;
const NodeCache = require('node-cache');
exports.cache = new NodeCache();
const appliedCache = (duration) => (req, res, next) => {
    if (req.method !== 'GET')
        return next();
    const key = req.originalUrl;
    const cacheResponse = exports.cache.get(key);
    if (cacheResponse) {
        console.log("send from cache");
        res.send(cacheResponse);
    }
    else {
        console.log("send from server");
        res.originalSend = res.send;
        res.send = (body) => {
            res.originalSend(body);
            exports.cache.set(key, body, duration);
        };
        next();
    }
};
exports.appliedCache = appliedCache;
//# sourceMappingURL=route_cache.js.map