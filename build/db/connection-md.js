"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database = process.env.PSHDB || 'psh';
const user = process.env.PSHUSER || 'php_query';
const pass = process.env.PSHPASS || 'php30384335';
const host = process.env.PSHHOST || '10.0.64.28';
const db = new sequelize_1.Sequelize(database, user, pass, {
    host,
    dialect: "mariadb",
    define: {
        timestamps: false
    }
});
exports.default = db;
//# sourceMappingURL=connection-md.js.map