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
exports.getDcMovements = void 0;
const connection_ss_1 = __importDefault(require("../db/connection-ss"));
const getDcMovements = (permissionDate, personFile, type) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const movement = (_a = yield connection_ss_1.default.query('EXEC	[dbo].[Repo_GetDigicardMovements] :permissionDate, :personFile, :type', {
        raw: true,
        plain: true,
        replacements: {
            permissionDate,
            personFile,
            type
        }
    })) !== null && _a !== void 0 ? _a : { mov_id: 1, mov_timestamp: null, mov_panelname: "NA" };
    return movement;
});
exports.getDcMovements = getDcMovements;
//# sourceMappingURL=movements.js.map