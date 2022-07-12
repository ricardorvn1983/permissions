import { DataTypes } from "sequelize";
import db from "../db/connection-md";
import Concept from "./concept";
import Motive from "./motive";
import PaymentType from "./payment_type";
import PermissionType from "./permission_type";
import PermissionStatus from "./permission_status"
import { endDate, personFile, startDate } from "./validations/permission";

const Permission = db.define ('permission', {
    person_file: {
        type: DataTypes.CHAR,
        validate:  personFile 
    },
    start_date: {
        type: DataTypes.DATE,
        validate: startDate
    },
    end_date: {
        type: DataTypes.DATE,
        validate: endDate
    },
    permission_type_id: {
        type: DataTypes.TINYINT
    },
    line_id: {
        type: DataTypes.SMALLINT
    },
    person_sign: {
        type: DataTypes.CHAR
    },
    person_sign_date: {
        type: DataTypes.DATE
    },
    authorizer_sign: {
        type: DataTypes.CHAR
    },
    trh_checkin: {
        type: DataTypes.DATE
    },
    trh_checkout: {
        type: DataTypes.DATE
    },
    security_checkin: {
        type: DataTypes.DATE
    },
    security_checkout: {
        type: DataTypes.DATE
    },
    concept_id: {
        type: DataTypes.TINYINT
    },
    motive_id: {
        type: DataTypes.SMALLINT
    },
    declared_motive: {
        type: DataTypes.CHAR
    },
    payment_type_id: {
        type: DataTypes.TINYINT
    },
    permission_status_id: {
        type: DataTypes.TINYINT
    }
},{
    timestamps: false,
    underscored: true
});

Permission.belongsTo(Concept);
Concept.hasMany(Permission);

Permission.belongsTo(Motive);
Motive.hasMany(Permission);

Permission.belongsTo(PermissionType);
PermissionType.hasMany(Permission);

Permission.belongsTo(PaymentType);
PaymentType.hasMany(Permission);

Permission.belongsTo(PermissionStatus);
PermissionStatus.hasMany(Permission);

export default Permission;