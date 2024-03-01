import {badRequestOnly} from "./generic.js";

export function getById(req ,res) {
    return badRequestOnly(req,res);
}
export function addbyId(req,res){
    if(!req.body.testid) return res.status(400).json({error: "Testid missing in body."})
    if(!req.body.moduleid) return res.status(400).json({error: "Moduleid missing in body."})

    return badRequestOnly(req,res)
}
