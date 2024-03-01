import {badRequestOnly, notFoundReq} from "./generic.js";

export function getStatusQuery(req, res) {
    req.baseUrl = 'testStatus';
    return badRequestOnly(req, res);
}

export function getStatusById(req,res) {
    req.baseUrl = 'testStatus';
    return notFoundReq(req, res);
}