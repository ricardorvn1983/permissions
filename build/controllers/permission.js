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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePermission = exports.putPermissionSign = exports.putPermission = exports.postPermission = exports.getPermission = exports.getPermissions = exports.getFilterPermissions = void 0;
const toutc_1 = require("../helpers/toutc");
const clients_1 = require("../services/broadcast/clients");
const app_1 = require("../app");
const route_cache_1 = require("../middlewares/route_cache");
const sequelize_1 = require("sequelize");
const movements_1 = require("./movements");
const permission_status_1 = __importDefault(require("../models/permission_status"));
const permission_type_1 = __importDefault(require("../models/permission_type"));
const payment_type_1 = __importDefault(require("../models/payment_type"));
const permission_1 = __importDefault(require("../models/permission"));
const concept_1 = __importDefault(require("../models/concept"));
const motive_1 = __importDefault(require("../models/motive"));
const addTimeToDate_1 = require("../helpers/addTimeToDate");
const MINUTES_LIMIT_TO_DISABLE = 15;
const MIN_MINUTES_TO_SIGN = 15;
const MAX_MINUTES_TO_SIGN = 15;
const permission_options = {
    include: [{
            model: concept_1.default,
            attributes: ['id', 'description', 'short_description']
        }, {
            model: motive_1.default,
            attributes: ['description']
        }, {
            model: permission_type_1.default,
            attributes: ['id', 'description']
        }, {
            model: payment_type_1.default,
            attributes: ['description']
        }, {
            model: permission_status_1.default,
            attributes: ['id', 'description']
        }],
    attributes: ['id', 'person_file', 'create_date', 'start_date', 'end_date', 'person_sign', 'person_sign_date', 'authorizer_sign', 'trh_checkin', 'trh_checkout', 'security_checkin', 'security_checkout', 'declared_motive']
};
const getFilterPermissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const today = (0, toutc_1.createLocalDateToUtc)().split("T");
    const start_date = req.query.start_date == undefined ? today[0] : req.query.start_date;
    delete req.query.start_date;
    const permission = yield permission_1.default.findAll(Object.assign({ where: {
            [sequelize_1.Op.and]: [req.query],
            start_date: {
                [sequelize_1.Op.startsWith]: start_date
            }
        } }, permission_options));
    res.json(permission);
});
exports.getFilterPermissions = getFilterPermissions;
const getPermissions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const permission = yield permission_1.default.findAll(permission_options);
    res.json(permission);
});
exports.getPermissions = getPermissions;
const getPermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const permission = yield permission_1.default.findByPk(id, permission_options);
    console.log(permission);
    res.json(permission);
});
exports.getPermission = getPermission;
const checkCanPost = (body) => __awaiter(void 0, void 0, void 0, function* () {
    let permissions = [];
    if (!Array.isArray(body)) {
        permissions.push(body);
    }
    else {
        permissions = body;
    }
    for (const permission of permissions) {
        const { start_date, person_file } = permission;
        const start_date_wo_time = start_date.split("T");
        //tiene un permiso para la misma fecha sin trhcheckout o securitycheckout <- puede ser que no se haya grabado el campo
        const permissionWithCheckOut = yield permission_1.default.findOne({
            where: {
                person_file: person_file,
                permission_status_id: 1,
                start_date: {
                    [sequelize_1.Op.startsWith]: start_date_wo_time[0]
                },
                security_checkout: null
            }
        });
        if (permissionWithCheckOut != null)
            throw new Error("Ya existe un permiso para la persona seleccionada.");
    }
});
const postPermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { multiple } = req.query;
    try {
        yield checkCanPost(body);
        let permission;
        if (multiple == undefined) {
            permission = yield permission_1.default.create(body);
        }
        else {
            if (multiple == "yes") {
                permission = yield permission_1.default.bulkCreate(body);
            }
            else {
                throw new Error("Query param is not set correctly.");
            }
        }
        (0, clients_1.broadcastMsg)('app_event', 'new_permission', "{}");
        let qty = route_cache_1.cache.del(app_1.server.apiPaths.permissions);
        console.log("cache borrado" + qty);
        res.json({ "error": false, "msg": "Se creo correctamente.", "inserted": permission });
    }
    catch (error) {
        res.status(400).json({ "error": true, "msg": error.message });
    }
});
exports.postPermission = postPermission;
const trhMovements = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const permission = yield permission_1.default.findByPk(id);
    const person_file = permission === null || permission === void 0 ? void 0 : permission.getDataValue('person_file');
    let start_date = permission === null || permission === void 0 ? void 0 : permission.getDataValue('start_date');
    let end_date = permission === null || permission === void 0 ? void 0 : permission.getDataValue('end_date');
    start_date = start_date.toISOString().replace('T', ' ').replace('Z', ' ');
    end_date = end_date.toISOString().replace('T', ' ').replace('Z', ' ');
    const { mov_timestamp: mov_timestamp_checkin } = yield (0, movements_1.getDcMovements)(start_date, person_file, 1);
    const { mov_timestamp: mov_timestamp_checkout } = yield (0, movements_1.getDcMovements)(end_date, person_file, 2);
    return { mov_timestamp_checkin, mov_timestamp_checkout };
});
const checkCanDisable = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const permission = yield permission_1.default.findByPk(id);
    const start_date = permission === null || permission === void 0 ? void 0 : permission.getDataValue('start_date');
    const datetimeLimit = (0, addTimeToDate_1.addTimeToDate)((0, toutc_1.createLocalDateToUtc)(), MINUTES_LIMIT_TO_DISABLE);
    const permission_datetime = new Date(start_date);
    return !(datetimeLimit > permission_datetime);
});
const putPermission = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const { mov_timestamp_checkin, mov_timestamp_checkout } = yield trhMovements(id);
        body.trh_checkin = mov_timestamp_checkin;
        body.trh_checkout = mov_timestamp_checkout;
        const canDisable = req.body.permission_status_id != undefined ? yield checkCanDisable(id) : true;
        if (!canDisable)
            throw new Error(`El permiso id = ${id} no puede deshabilitarse.`);
        const updatePermission = yield permission_1.default.update(body, { where: { id } });
        (0, clients_1.broadcastMsg)('updatedata', 'Permission Updated', "{}");
        let qty = route_cache_1.cache.del(app_1.server.apiPaths.permissions);
        console.log("cache borrado " + qty);
        res.json({ error: false, msg: "Se actualizo correctamente.", affected: updatePermission });
    }
    catch (e) {
        res.status(400).json({ "error": true, "msg": e.message });
    }
});
exports.putPermission = putPermission;
const putPermissionSign = (person_sign, person_file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const minDateLimit = (0, addTimeToDate_1.addTimeToDate)((0, toutc_1.createLocalDateToUtc)(), -MIN_MINUTES_TO_SIGN);
        const maxDateLimit = (0, addTimeToDate_1.addTimeToDate)((0, toutc_1.createLocalDateToUtc)(), MAX_MINUTES_TO_SIGN);
        const permission = yield permission_1.default.findOne({
            where: {
                person_file,
                start_date: {
                    [sequelize_1.Op.between]: [minDateLimit, maxDateLimit]
                }
            }
        });
        const person_sign_date = (0, toutc_1.createLocalDateToUtc)();
        const id = permission === null || permission === void 0 ? void 0 : permission.getDataValue('id');
        const [updatePermission] = yield permission_1.default.update({ person_sign, person_sign_date }, { where: { id } });
        (0, clients_1.broadcastMsg)('app_event', 'permission_signed', `{ "id" : "${id}" }`);
        return (updatePermission > 0);
    }
    catch (e) {
        return false;
    }
});
exports.putPermissionSign = putPermissionSign;
const deletePermission = (req, res) => {
    // res.status(500).json({error: true, msg: "not implemented yet"});
};
exports.deletePermission = deletePermission;
//# sourceMappingURL=permission.js.map