import { DataTypes } from "sequelize";
import db from "../db/connection-md";

const Motive = db.define ('motive', {
    description: {
        type: DataTypes.CHAR
    },
    enable: {
        type: DataTypes.SMALLINT
    }
},{
    timestamps: false
});

export default Motive;