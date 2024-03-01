import {badRequestOnly, notFoundReq} from "./generic.js";

export function getModule(req, res) {
    if (req.params.testid)
    req.baseUrl = 'testmodule';
    return badRequestOnly(req, res);
}

export function getModuleById(req, res) {
    if (req.params.testid)
        req.baseUrl = 'testmodule';
    return notFoundReq(req, res);
}

export function postModule(req, res) {
    if (req.params.testid)
        req.baseUrl = 'testmodule';
    return badRequestOnly(req, res);
}

export function deleteModuleById(req, res) {
    if (req.params.testid)
        req.baseUrl = 'testmodule';
    return badRequestOnly(req, res);
}

export function editModule(req, res) {
    req.baseUrl = 'testmodule';
    return badRequestOnly(req, res);
}

export function editLabel(req, res) {
    req.baseUrl = 'module';
    return badRequestOnly(req, res);
}