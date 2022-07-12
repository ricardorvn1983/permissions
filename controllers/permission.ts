import { Request, Response } from "express";
import { createLocalDateToUtc } from "../helpers/toutc";
import { broadcastMsg } from "../services/broadcast/clients";
import { server } from "../app";
import { cache } from "../middlewares/route_cache";
import { Op } from "sequelize";
import { getDcMovements } from "./movements";
import PermissionStatus from "../models/permission_status";
import PermissionType from "../models/permission_type";
import PaymentType from "../models/payment_type";
import Permission from "../models/permission";
import Concept from "../models/concept";
import Motive from "../models/motive";
import { Permission_Type } from "../domain/entity/permission";
import { addTimeToDate } from "../helpers/addTimeToDate";

const MINUTES_LIMIT_TO_DISABLE: number = 15;
const MIN_MINUTES_TO_SIGN: number = 15;
const MAX_MINUTES_TO_SIGN: number = 15;

const permission_options = {
    include: [{
        model: Concept,
        attributes: ['id', 'description', 'short_description']
    },{
        model: Motive,
        attributes: ['description']
    },{
        model: PermissionType,
        attributes: ['id','description']
    },{
        model: PaymentType,
        attributes: ['description']
    },{
        model: PermissionStatus,
        attributes: ['id', 'description']
    }],
    attributes: ['id', 'person_file', 'create_date' ,'start_date', 'end_date', 'person_sign', 'person_sign_date', 'authorizer_sign', 'trh_checkin', 'trh_checkout', 'security_checkin', 'security_checkout', 'declared_motive']
}

export const getFilterPermissions = async (req: Request, res: Response): Promise<void> =>{
    const today =  createLocalDateToUtc().split("T");
    const start_date = req.query.start_date == undefined ? today[0] : req.query.start_date;
    delete req.query.start_date;
    const permission = await Permission.findAll({
        where : {
                    [Op.and]:[ req.query ]
                    , start_date: {
                        [Op.startsWith]: start_date
                    }
                },
                ...permission_options 
    });
    res.json(permission);
}

export const getPermissions = async (req: Request, res: Response): Promise<void> =>{
    const permission = await Permission.findAll(permission_options);
    res.json(permission)
}

export const getPermission = async (req: Request, res: Response): Promise<void> =>{
    const { id } = req.params;
    const permission = await Permission.findByPk(id, permission_options);
    console.log (permission);
    res.json(permission)
}

const checkCanPost = async ( body: [Permission_Type] |  Permission_Type ): Promise<void | Error> =>{
    let permissions = [];
    if (!Array.isArray(body)){
        permissions.push (body);
    }else{
        permissions = body;
    }
    for (const permission of permissions) {
        const {start_date, person_file } = permission;
        const start_date_wo_time = start_date.split("T");
        //tiene un permiso para la misma fecha sin trhcheckout o securitycheckout <- puede ser que no se haya grabado el campo
        const permissionWithCheckOut = await Permission.findOne ({
            where: {
                person_file: person_file,
                permission_status_id: 1,
                start_date: {
                    [Op.startsWith]: start_date_wo_time[0]
                },
                security_checkout: null
            }
        });
        if (permissionWithCheckOut != null) throw new Error("Ya existe un permiso para la persona seleccionada.");
    }
}

export const postPermission = async (req :Request, res: Response): Promise<void> =>{
    const { body } = req;
    const { multiple } = req.query; 
    try {
        await checkCanPost(body);
        let permission;
        if (multiple == undefined){
            permission = await Permission.create( body );
        }else{
            if (multiple == "yes"){
                permission = await Permission.bulkCreate( body );
            }else{
                throw new Error("Query param is not set correctly.");
            }
        }
        broadcastMsg('app_event', 'new_permission',"{}");
        let qty = cache.del(server.apiPaths.permissions);
        console.log ("cache borrado" + qty);
        res.json ( { "error": false, "msg": "Se creo correctamente.", "inserted": permission } );
    }catch (error: any){
        res.status(400).json( { "error": true, "msg": error.message } );
    }
}

const trhMovements = async ( id: string ): Promise<any> =>{
    const permission  = await Permission.findByPk(id);
    const person_file = permission?.getDataValue('person_file');
    let start_date    = permission?.getDataValue('start_date');
    let end_date      = permission?.getDataValue('end_date');
    start_date        = start_date.toISOString().replace('T', ' ').replace('Z', ' ');
    end_date          = end_date.toISOString().replace('T', ' ').replace('Z', ' ');
    const { mov_timestamp : mov_timestamp_checkin } = await getDcMovements(start_date, person_file, 1);
    const { mov_timestamp : mov_timestamp_checkout } = await getDcMovements(end_date, person_file, 2);
    return { mov_timestamp_checkin,  mov_timestamp_checkout };
}

const checkCanDisable = async ( id: string ): Promise<Boolean> =>{
    const permission  = await Permission.findByPk(id);   
    const start_date = permission?.getDataValue('start_date');
    const datetimeLimit = addTimeToDate(createLocalDateToUtc(), MINUTES_LIMIT_TO_DISABLE);
    const permission_datetime = new Date(start_date);
    return !(datetimeLimit > permission_datetime);
}

export const putPermission = async( req: Request, res: Response ): Promise<void> =>{
    const { id } = req.params;
    const { body } = req;
    try {
        const { mov_timestamp_checkin, mov_timestamp_checkout } = await trhMovements ( id );
        body.trh_checkin = mov_timestamp_checkin;
        body.trh_checkout = mov_timestamp_checkout;
        const canDisable = req.body.permission_status_id != undefined ? await checkCanDisable( id ): true;
        
        if (!canDisable) throw new Error(`El permiso id = ${ id } no puede deshabilitarse.`);        
        const updatePermission: [any] = await Permission.update(body,{ where: { id } });
        broadcastMsg('updatedata', 'Permission Updated',"{}");

        let qty = cache.del(server.apiPaths.permissions);
        console.log ("cache borrado " + qty);
        res.json({ error: false, msg: "Se actualizo correctamente.", affected: updatePermission });
    }catch (e: Error | any){
        res.status(400).json({ "error": true, "msg": e.message });
    }
}

export const putPermissionSign = async ( person_sign: string, person_file: string ): Promise<boolean> =>{
    try {
        const minDateLimit = addTimeToDate (createLocalDateToUtc(), -MIN_MINUTES_TO_SIGN);
        const maxDateLimit = addTimeToDate (createLocalDateToUtc(), MAX_MINUTES_TO_SIGN);
        const permission = await Permission.findOne ({
            where:{
                person_file,
                start_date: {
                    [Op.between]: [minDateLimit, maxDateLimit]
                }
            }
        })
        const person_sign_date = createLocalDateToUtc();
        const id = permission?.getDataValue('id');
        const [updatePermission] = await Permission.update( { person_sign, person_sign_date }, { where: { id } })
        broadcastMsg ('app_event', 'permission_signed', `{ "id" : "${id}" }`);
        return (updatePermission > 0);
    }catch (e: any){
        return false;
    }
}

export const deletePermission = ( req: Request, res: Response ): void => {
    // res.status(500).json({error: true, msg: "not implemented yet"});
}