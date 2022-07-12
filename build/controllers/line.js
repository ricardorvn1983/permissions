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
exports.getLine = exports.getLines = void 0;
const connection_fb_1 = require("../db/connection-fb");
const getLines = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const lines = yield (0, connection_fb_1.prepareFbQuery)('SELECT NRO_LINEA, NRO_TURNO, DESCRIPCION FROM LINEAS');
    res.json(lines);
});
exports.getLines = getLines;
const getLine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (isNaN(id)) {
        res.status(400).json({ msg: "Param [ID] is not numeric." });
        return;
    }
    try {
        const line = yield (0, connection_fb_1.prepareFbQuery)(`SELECT NRO_LINEA, NRO_TURNO, DESCRIPCION FROM LINEAS WHERE NRO_LINEA = ${id}`);
        res.json(!line.length ? { msg: "no existen registros" } : line);
    }
    catch (e) {
        res.status(404);
    }
});
exports.getLine = getLine;
//# sourceMappingURL=line.js.map