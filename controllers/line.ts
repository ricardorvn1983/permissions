import { Request, Response } from "express";
import { prepareFbQuery } from "../db/connection-fb";
export const getLines = async (req: Request, res: Response): Promise<any>=>{
    const lines = await prepareFbQuery('SELECT NRO_LINEA, NRO_TURNO, DESCRIPCION FROM LINEAS');
    res.json(lines);
}

export const getLine = async (req: Request, res: Response): Promise<any>=>{
    const { id } = req.params;
    if (isNaN (id as any)){
        res.status(400).json({msg: "Param [ID] is not numeric."});
        return;
    }
    try {
        const line = await prepareFbQuery (`SELECT NRO_LINEA, NRO_TURNO, DESCRIPCION FROM LINEAS WHERE NRO_LINEA = ${id}`);
        res.json(!line.length ? {msg: "no existen registros"} : line);
    }catch (e){
        res.status(404);
    }
}