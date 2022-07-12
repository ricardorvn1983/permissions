import { Request, Response } from "express";
import { addClient, broadcastMsg } from "../services/broadcast/clients";

export const subscribe = (req: Request, res: Response): void =>{
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Access-Control-Allow-Origin', '*');
    addClient(res);
    broadcastMsg('info','connected',"{}");
    console.log ("conectado");
}

