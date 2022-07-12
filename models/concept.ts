import { DataTypes } from "sequelize";
import db from "../db/connection-md";

const Concept = db.define ('concept',{
    description: {
        type: DataTypes.CHAR
    },
    short_description: {
        type: DataTypes.CHAR
    },
    visible_only_hr: {
        type: DataTypes.TINYINT
    },
    enable: {
        type: DataTypes.TINYINT
    },
},{
    timestamps : false,
    underscored: true
});

export default Concept;