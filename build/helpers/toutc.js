"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldsToUtf8 = exports.createLocalDateToUtc = void 0;
const createLocalDateToUtc = () => {
    const tzOffset = (new Date()).getTimezoneOffset() * 60000;
    const localDatetoUtc = (new Date(Date.now() - tzOffset)).toISOString();
    return localDatetoUtc;
};
exports.createLocalDateToUtc = createLocalDateToUtc;
const fieldsToUtf8 = (results) => {
    results.map((fields) => {
        for (let i in fields) {
            if (typeof (fields[i]) === "object") {
                fields[i] = fields[i].toString('utf8').trim();
            }
        }
    });
};
exports.fieldsToUtf8 = fieldsToUtf8;
//# sourceMappingURL=toutc.js.map