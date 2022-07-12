import { QueryTypes } from "sequelize";
import dbSFC from "../db/connection-ss";

interface DcEmpData {
    emp_id: number,
    emp_file: string,
    emp_surname: string,
    emp_name: string,
    card_number: string;
}

export const getDcEmployeeData = async( card_number: string ): Promise<DcEmpData> =>{
    const emptyEmpData: DcEmpData ={
        emp_id : 0,
        emp_file : "NF",
        emp_surname : "NF",
        emp_name: "NF",
        card_number: "NF"
    }
    try {
        const employeeData: DcEmpData | null = await dbSFC.query('EXEC [dbo].[Repo_GetDigicardEmpData] :card_number', {
            raw: true,
            plain: true,
            type: QueryTypes.SELECT,
            replacements: {
                card_number
            }
        })
        return (employeeData == null ? emptyEmpData : employeeData);
    }catch (e: any){
        return emptyEmpData;
    }
    
}