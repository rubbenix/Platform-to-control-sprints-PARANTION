import {
    badRequestOnly,
    isBlank,
    notFoundReq,
    performSimpleOneQuery,
    removeBodyParametersIgnoreCase
} from "./generic.js";
import {performQuery} from "../database/database.js";

export function getQuery(req, res) {
    return badRequestOnly(req, res);
}

export function deleteTest(req, res) {
    return notFoundReq(req, res);
}

export function postQuery(req, res) {
    if(isBlank(req.body.name)) return res.status(400).json({error: "Name cannot be empty."});
    return badRequestOnly(req, res);
}

export async function putQuery(req, res) {
    return badRequestOnly(req, res);
}

export function getTestById(req, res) {
    return notFoundReq(req, res);
}

export function putTestById(req, res) {
    req = removeBodyParametersIgnoreCase(req, 'lastupdate');
    req.body.lastupdate = new Date().toDateString();
    return notFoundReq(req, res);
}

export async function getTotalWeight(req, res) {
    const sumWeightQuery = 'select sum(weight) from teststep where testid=$1';
    const findTest = await performSimpleOneQuery('test', 'get', 'testid', req.params.testid);
    if(!findTest[0]) return res.status(404).json({"erorr": "The test was not found."})
    const weight = await performQuery(sumWeightQuery, [req.params.testid]);
    if (weight[0].sum === null) return res.status(200).json({"sum": 0})
    return res.status(200).json(weight[0]);
}