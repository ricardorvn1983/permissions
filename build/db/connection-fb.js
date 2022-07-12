"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.prepareFbQuery = void 0;
const toutc_1 = require("../helpers/toutc");
const Firebird = require('node-firebird');
const util = require('util');
const options = {
    host: '10.0.97.19',
    port: 3050,
    database: 'c:\\BDs\\PSHv3.fdb',
    user: 'SYSDBA',
    password: 'viperava',
    lowercase_keys: false,
    role: null,
    pageSize: 4096,
    retryConnectionInterval: 1000,
};
const dbQuery = (db, sql) => {
    return new Promise((resolve, reject) => {
        db.query(sql, (err, result) => {
            if (err) {
                return reject(err);
            }
            resolve(result);
        });
    });
};
const attachDb = util.promisify(Firebird.attach);
const prepareFbQuery = (sql) => __awaiter(void 0, void 0, void 0, function* () {
    const db = yield attachDb(options);
    const results = yield dbQuery(db, sql);
    (0, toutc_1.fieldsToUtf8)(results);
    db.detach();
    return results;
});
exports.prepareFbQuery = prepareFbQuery;
//# sourceMappingURL=connection-fb.js.map