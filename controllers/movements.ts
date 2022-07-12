import dbSFC from "../db/connection-ss";

interface dcMovement {
    mov_id? : number,
    mov_timestamp?: string,
    mov_panelname?: string 
}

export const getDcMovements = async(permissionDate: string, personFile: string, type: number): Promise<dcMovement> =>{
    const movement : dcMovement  = await dbSFC.query('EXEC	[dbo].[Repo_GetDigicardMovements] :permissionDate, :personFile, :type', {
        raw: true,
        plain: true,
        replacements: {
            permissionDate,
            personFile,
            type
        }}) ?? { mov_id: 1, mov_timestamp: null, mov_panelname: "NA" };
    return movement;
}