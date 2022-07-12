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
exports.getPerson = exports.getPersons = void 0;
const connection_fb_1 = require("../db/connection-fb");
const getPersons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const persons = yield (0, connection_fb_1.prepareFbQuery)(`SELECT 
            ID_OPERARIO,
            LEGAJO,
            APE_NOM,
            LINEA_ASIGNADA.DESCRIPCION AS LINEA_ASIGNADA,
            LINEA_ACTUAL.DESCRIPCION  AS LINEA_ACTUAL,
            LINEA_ASIGNADA.NRO_LINEA AS ID_LINEA_ASIGNADA, 
            LINEA_ACTUAL.NRO_LINEA AS ID_LINEA_ACTUAL, 
            CAST (TURNOS_OPERARIOS.HORARIO_INGRESO as varchar(100)) AS HORARIO_INGRESO,
            CAST (TURNOS_OPERARIOS.HORARIO_EGRESO as varchar(100)) AS HORARIO_EGRESO
        FROM OPERARIOS
        JOIN LINEAS LINEA_ASIGNADA ON OPERARIOS.NRO_LINEA_ASIG = LINEA_ASIGNADA.NRO_LINEA
        JOIN LINEAS LINEA_ACTUAL ON OPERARIOS.NRO_LINEA_ACTUAL = LINEA_ACTUAL.NRO_LINEA
        JOIN TURNOS_OPERARIOS ON TURNOS_OPERARIOS.ID_TURNO_OP = OPERARIOS.ID_TURNO_OPERARIO
        WHERE NRO_HABILITADO = 1`);
    res.json(persons);
});
exports.getPersons = getPersons;
const getPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (isNaN(id)) {
        res.status(400).json({ msg: "Param [ID] is not numeric." });
        return;
    }
    try {
        //CAST (TRIM(DESCRIPCION) AS varchar(100) character SET UTF8)
        const person = yield (0, connection_fb_1.prepareFbQuery)(`SELECT 
                ID_OPERARIO,
                LEGAJO,
                APE_NOM,
                LINEA_ASIGNADA.DESCRIPCION,
                LINEA_ACTUAL.DESCRIPCION,
                LINEA_ASIGNADA.NRO_LINEA AS ID_LINEA_ASIGNADA, 
                LINEA_ACTUAL.NRO_LINEA AS ID_LINEA_ACTUAL, 
                CAST (TURNOS_OPERARIOS.HORARIO_INGRESO as varchar(100)) AS HORARIO_INGRESO,
                CAST (TURNOS_OPERARIOS.HORARIO_EGRESO as varchar(100)) AS HORARIO_EGRESO
            FROM OPERARIOS
            JOIN LINEAS LINEA_ASIGNADA ON OPERARIOS.NRO_LINEA_ASIG = LINEA_ASIGNADA.NRO_LINEA
            JOIN LINEAS LINEA_ACTUAL ON OPERARIOS.NRO_LINEA_ASIG = LINEA_ACTUAL.NRO_LINEA
            JOIN TURNOS_OPERARIOS ON TURNOS_OPERARIOS.ID_TURNO_OP = OPERARIOS.ID_TURNO_OPERARIO WHERE OPERARIOS.LEGAJO = '${id}' AND NRO_HABILITADO = 1`);
        res.json(!person.length ? { msg: "no existen registros" } : person);
    }
    catch (e) {
        res.status(404);
    }
});
exports.getPerson = getPerson;
//# sourceMappingURL=person.js.map