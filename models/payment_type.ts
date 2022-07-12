import { DataTypes } from "sequelize";
import db from "../db/connection-md";

const PaymentType = db.define ('payment_type',{
    description: {
        type: DataTypes.CHAR
    }
},{
    timestamps : false
});

export default PaymentType;