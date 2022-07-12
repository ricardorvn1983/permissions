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
exports.getDcEmployeeData = void 0;
const sequelize_1 = require("sequelize");
const connection_ss_1 = __importDefault(require("../db/connection-ss"));
const getDcEmployeeData = (card_number) => __awaiter(void 0, void 0, void 0, function* () {
    const emptyEmpData = {
        emp_id: 0,
        emp_file: "NF",
        emp_surname: "NF",
        emp_name: "NF",
        card_number: "NF"
    };
    try {
        const employeeData = yield connection_ss_1.default.query('EXEC [dbo].[Repo_GetDigicardEmpData] :card_number', {
            raw: true,
            plain: true,
            type: sequelize_1.QueryTypes.SELECT,
            replacements: {
                card_number
            }
        });
        return (employeeData == null ? emptyEmpData : employeeData);
    }
    catch (e) {
        return emptyEmpData;
    }
});
exports.getDcEmployeeData = getDcEmployeeData;
//# sourceMappingURL=emp_card.js.map