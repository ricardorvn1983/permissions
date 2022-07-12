import { DataTypes } from "sequelize";
import db from "../db/connection-md";

const PermissionType = db.define ('permission_types',{
    description: {
        type: DataTypes.CHAR
    }
},{
    timestamps: false,
    underscored: true
});

export default PermissionType;