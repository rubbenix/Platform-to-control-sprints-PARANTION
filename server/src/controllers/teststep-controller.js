import {badRequestOnly, isBlank, notFoundReq, performSimpleOneQuery} from "./generic.js";
import {performQuery} from "../database/database.js";

export function getQuery(req, res) {
    req.baseUrl = 'teststep';
    return badRequestOnly(req, res);
}

export function getTestStepById(req, res) {
    req.baseUrl = 'teststep';
    return notFoundReq(req, res);
}

export function deleteQuery(req, res) {
    req.baseUrl = 'teststep';
    return badRequestOnly(req, res);
}

export async function postQuery(req, res) {
    req.baseUrl = 'teststep';
    if(isBlank(req.body.title)) return res.status(400).json({error: "Title cannot be empty."});
    if(!req.body.stepnr) return res.status(400).json({error: "Step number cannot be empty."});

    const testSearch = await performSimpleOneQuery('test', 'get', 'testid', req.params.testid);
    if(!testSearch[0]) return res.status(404).json({error: "Test not found. Id must match real test."})
    req.body.testid = req.params.testid;
    if(!req.body.weight) req.body.weight = 0;
    if(!req.body.testlog) req.body.testlog = "";
    return badRequestOnly(req, res);
}

export async function putQuery(req, res) {
    req.baseUrl = 'teststep';
    req.body.testid = req.params.testid;
    return badRequestOnly(req, res);
}