import { DataTypes } from "sequelize";
import db from "../db/connection-md";
import Concept from "./concept";
import PermissionType from "./permission_type";

const ConceptxPermission_Types = db.define ('conceptsxpermission_types',{
    concept_id: {
        type: DataTypes.TINYINT,
        references: {
            model: Concept, 
            key: 'id'
        }
    },
    permission_types_id: {
        type: DataTypes.TINYINT,
        references: {
            model: PermissionType, 
            key: 'id'
        }
    }
},{
    underscored: true,
    timestamps: false
});




export default ConceptxPermission_Types;