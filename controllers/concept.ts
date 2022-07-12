import { Request, Response } from "express";
import Concept from "../models/concept";
import Motive from "../models/motive";

const motives_concept_options = {
    include: {
        model: Motive,
        attributes: ['id','description', 'enable'],
        through: {
            attributes:[]
        }
    },
    attributes: ['id', 'description','short_description', 'visible_only_hr', 'enable']
}

export const getConcepts = async (req: Request, res: Response): Promise<any> =>{
    const concepts = await Concept.findAll();
    res.json(concepts);
}

export const getConcept = async (req: Request, res: Response): Promise<any> =>{
    const { cid } = req.params;
    const concept = await Concept.findByPk(cid);
    res.json(concept);
}

export const getMotives_Concept = async (req: Request, res: Response): Promise<any> =>{
    const { cid } = req.params;
    Concept.belongsToMany(Motive, { through: 'motivesxconcept' });
    Motive.belongsToMany(Concept, { through: 'motivesxconcept' });
    const motives_concept = await Concept.findByPk(cid, motives_concept_options);
    res.json(motives_concept)
}
