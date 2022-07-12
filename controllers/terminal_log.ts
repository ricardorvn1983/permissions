import { Request, Response } from "express";
import { convertReadingToWiegand } from "../helpers/convertReading";
import Terminal_Logs from "../models/terminal_log";
import { getDcEmployeeData } from "./emp_card";
import { putPermissionSign } from "./permission";

export const postLog = async (req: Request, res: Response): Promise<void> =>{
    const { body } =  req;
    const { reading : card_number } = req.body;
    try {
        await Terminal_Logs.create( body );
        console.log (convertReadingToWiegand (card_number));
        const employeeData = await getDcEmployeeData ( convertReadingToWiegand(card_number) );
        const signPermission: boolean =  await putPermissionSign( convertReadingToWiegand (card_number), employeeData.emp_file);
        //res.json ({error: false, msg: {employeeData , signed: signPermission } });
        res.json ({ emp_name: employeeData.emp_name, emp_lastname: employeeData.emp_surname , signed: signPermission });
    }catch(e: any){
        res.json ({error: true, msg: e.message});
    }
}
