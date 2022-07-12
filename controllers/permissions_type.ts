import { Request, Response } from "express";
import Concept from "../models/concept";
import PermissionType from "../models/permission_type";

const permissiontype_concept_options = {
    include: {
        model: Concept,
        attributes: ['id','description', 'short_description', 'visible_only_hr', 'enable'],
        through: {
            attributes:[]
        }
    },
    attributes: ['id', 'description']
}

export const getPermissionsTypes = async (req: Request, res: Response)=>{
    const permissionstypes = await PermissionType.findAll();
    res.json(permissionstypes)
}

export const getPermissionType = async (req: Request, res: Response): Promise<any> =>{
    const { ptype } = req.params;
    const permissiontype = await PermissionType.findByPk(ptype);
    res.json (permissiontype);
}

export const getPermissionsTypes_Concepts = async (req: Request, res: Response): Promise<any>=>{
    const { ptype } = req.params;
    PermissionType.belongsToMany(Concept, { through: 'conceptsxpermission_types' });
    Concept.belongsToMany(PermissionType, { through: 'conceptsxpermission_types' });
    const permissiontype_concepts = await PermissionType.findByPk(ptype, permissiontype_concept_options);
    res.json(permissiontype_concepts);
}