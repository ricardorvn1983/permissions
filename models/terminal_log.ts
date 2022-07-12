import { DataTypes } from "sequelize";
import db from "../db/connection-md";

const Terminal_Logs = db.define ('terminal_log',{
    log_timestamp: {
        type: DataTypes.DATE
    },
    terminal_id: {
        type: DataTypes.TINYINT
    },
    reading: {
        type: DataTypes.CHAR
    }
},{
    timestamps : false,
    underscored: true
});

export default Terminal_Logs;