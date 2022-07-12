import { DataTypes } from "sequelize";
import db from "../db/connection-md";

const PermissionStatus = db.define ('permission_status',{
    description: {
        type: DataTypes.CHAR
    }
},{
    timestamps: false,
    underscored: true
});

export default PermissionStatus;