import {
    badRequestOnly,
    notFoundReq, performQueryFromReq, performSimpleOneQuery,
    removeBodyParametersIgnoreCase
} from "./generic.js";

export function getAll(req, res) {
    req.query.combinatory = true;
    return badRequestOnly(req, res);
}

export async function updateTestStatus(req, res) {
    req = removeBodyParametersIgnoreCase(req, 'sprintid, testid, completiondate, userid');
    if(req.body.statusid === 2) {
        req.body.completionDate = new Date().toDateString();
    } else {
        req.body.completionDate = null;
    }

    const sprintSearch = await performSimpleOneQuery('sprint', 'get', 'sprintid', req.params.sprintid);
    if(!sprintSearch[0]) return res.status(404).json({error: "Sprint not found. Id must match real sprint."})

    const testSearch = await performSimpleOneQuery('test', 'get', 'testid', req.params.testid);
    if(!testSearch[0]) return res.status(404).json({error: "Test not found. Id must match real test."})

    const userSearch = await performSimpleOneQuery('teststatus', 'get', 'statusid', req.body.statusid);
    if(!userSearch[0]) return res.status(404).json({error: "Status not found. Id must match real status."})
    req.query.combinatory = true;
    return notFoundReq(req, res);
}

export function postTestStatus(req, res) {
    req.query.combinatory = true;

    return badRequestOnly(req, res);
}

export async function postTesting(req, res) {
    if(!req.body.sprintid || !req.body.testid) {
        return res.status(404).json({error: "Body data missing. Must include sprintid and testid"})
    }

    const sprintSearch = await performSimpleOneQuery('sprint', 'get', 'sprintid', req.body.sprintid);
    if(!sprintSearch[0]) return res.status(404).json({error: "Sprint not found. Id must match real sprint."})

    const testSearch = await performSimpleOneQuery('test', 'get', 'testid', req.body.testid);
    if(!testSearch[0]) return res.status(404).json({error: "Test not found. Id must match real test."})

    req.query.combinatory = true;

    return badRequestOnly(req, res);
}

export async function updateTestAssignee(req, res) {
    console.log(req.body)
    console.log(req.params)
    if(req.body.userid === '-1') {
        req.body.userid = null;
    }
    req = removeBodyParametersIgnoreCase(req, 'sprintid, testid, completiondate, statusid');
    const userSearch = await performSimpleOneQuery('users', 'get', 'userid', req.body.userid);
    if(!userSearch[0]) return res.status(404).json({error: "User not found. Id must match real user."})
    req.query.combinatory = true;
    return notFoundReq(req, res);
}

export async function getTestAssignee(req, res) {
    req.query.combinatory = true;

    const userIdResult = await performQueryFromReq(req);
    if(!userIdResult[0]) return res.status(404).json({error: "User or sprint not found."})
    if(userIdResult[0].userid === null) {
        return res.status(200).json({email: "null"});
    }
    req.query.combinatory = true;
    req.query.columns = 'userid'
    const userEmailResult = await performSimpleOneQuery('users','get','userid', userIdResult[0].userid);
    return res.status(200).json({email: userEmailResult[0].email});
}