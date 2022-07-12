"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database = process.env.SFCDB || "BGH_SFC";
const user = process.env.SFCUSER || "sfc";
const pass = process.env.SFCPASS || "sfc";
const host = process.env.SFCHOST || "ARRGA-VS-DB004.ar.bgh.corp";
const dbSFC = new sequelize_1.Sequelize(database, user, pass, {
    host,
    dialect: "mssql"
});
exports.default = dbSFC;
//# sourceMappingURL=connection-ss.js.map