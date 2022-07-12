"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_md_1 = __importDefault(require("../db/connection-md"));
const concept_1 = __importDefault(require("./concept"));
const motive_1 = __importDefault(require("./motive"));
const payment_type_1 = __importDefault(require("./payment_type"));
const permission_type_1 = __importDefault(require("./permission_type"));
const permission_status_1 = __importDefault(require("./permission_status"));
const permission_1 = require("./validations/permission");
const Permission = connection_md_1.default.define('permission', {
    person_file: {
        type: sequelize_1.DataTypes.CHAR,
        validate: permission_1.personFile
    },
    start_date: {
        type: sequelize_1.DataTypes.DATE,
        validate: permission_1.startDate
    },
    end_date: {
        type: sequelize_1.DataTypes.DATE,
        validate: permission_1.endDate
    },
    permission_type_id: {
        type: sequelize_1.DataTypes.TINYINT
    },
    line_id: {
        type: sequelize_1.DataTypes.SMALLINT
    },
    person_sign: {
        type: sequelize_1.DataTypes.CHAR
    },
    person_sign_date: {
        type: sequelize_1.DataTypes.DATE
    },
    authorizer_sign: {
        type: sequelize_1.DataTypes.CHAR
    },
    trh_checkin: {
        type: sequelize_1.DataTypes.DATE
    },
    trh_checkout: {
        type: sequelize_1.DataTypes.DATE
    },
    security_checkin: {
        type: sequelize_1.DataTypes.DATE
    },
    security_checkout: {
        type: sequelize_1.DataTypes.DATE
    },
    concept_id: {
        type: sequelize_1.DataTypes.TINYINT
    },
    motive_id: {
        type: sequelize_1.DataTypes.SMALLINT
    },
    declared_motive: {
        type: sequelize_1.DataTypes.CHAR
    },
    payment_type_id: {
        type: sequelize_1.DataTypes.TINYINT
    },
    permission_status_id: {
        type: sequelize_1.DataTypes.TINYINT
    }
}, {
    timestamps: false,
    underscored: true
});
Permission.belongsTo(concept_1.default);
concept_1.default.hasMany(Permission);
Permission.belongsTo(motive_1.default);
motive_1.default.hasMany(Permission);
Permission.belongsTo(permission_type_1.default);
permission_type_1.default.hasMany(Permission);
Permission.belongsTo(payment_type_1.default);
payment_type_1.default.hasMany(Permission);
Permission.belongsTo(permission_status_1.default);
permission_status_1.default.hasMany(Permission);
exports.default = Permission;
//# sourceMappingURL=permission.js.map