import { DataTypes } from "sequelize";
import db from "../db/connection-md";
import Concept from "./concept";
import Motive from "./motive";

const MotivesxConcept = db.define ('motivesxconcept',{
    concept_id: {
        type: DataTypes.TINYINT,
        references: {
            model: Concept, 
            key: 'id'
        }
    },
    motive_id: {
        type: DataTypes.TINYINT,
        references: {
            model: Motive, 
            key: 'id'
        }
    }
},{
    underscored: true,
    timestamps: false
});




export default MotivesxConcept;