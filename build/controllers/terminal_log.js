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
exports.postLog = void 0;
const convertReading_1 = require("../helpers/convertReading");
const terminal_log_1 = __importDefault(require("../models/terminal_log"));
const emp_card_1 = require("./emp_card");
const permission_1 = require("./permission");
const postLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { reading: card_number } = req.body;
    try {
        yield terminal_log_1.default.create(body);
        console.log((0, convertReading_1.convertReadingToWiegand)(card_number));
        const employeeData = yield (0, emp_card_1.getDcEmployeeData)((0, convertReading_1.convertReadingToWiegand)(card_number));
        const signPermission = yield (0, permission_1.putPermissionSign)((0, convertReading_1.convertReadingToWiegand)(card_number), employeeData.emp_file);
        //res.json ({error: false, msg: {employeeData , signed: signPermission } });
        res.json({ emp_name: employeeData.emp_name, emp_lastname: employeeData.emp_surname, signed: signPermission });
    }
    catch (e) {
        res.json({ error: true, msg: e.message });
    }
});
exports.postLog = postLog;
//# sourceMappingURL=terminal_log.js.map