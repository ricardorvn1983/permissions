import { Request, Response } from "express";
import Motive from "../models/motive";

export const getMotives = async (req: Request, res: Response): Promise<void> =>{
    const motives = await Motive.findAll();
    res.json(motives)
}
