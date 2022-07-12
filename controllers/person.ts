import { Request, Response } from "express";
import { prepareFbQuery } from "../db/connection-fb";

export const getPersons = async (req: Request, res: Response): Promise<void> =>{
    const persons = await prepareFbQuery(
        `SELECT 
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
}

export const getPerson = async (req: Request, res: Response): Promise<void> =>{
    const { id } = req.params;
    if (isNaN (id as any)){
        res.status(400).json({msg: "Param [ID] is not numeric."});
        return;
    }
    try {
        //CAST (TRIM(DESCRIPCION) AS varchar(100) character SET UTF8)
        const person = await prepareFbQuery(
            `SELECT 
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
        res.json(!person.length ? {msg: "no existen registros"} : person);
    }catch (e){
        res.status(404);
    }
}