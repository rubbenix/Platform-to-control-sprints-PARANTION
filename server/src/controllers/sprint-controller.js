import {
    badRequestOnly,
    isBlank,
    isValidDate,
    notFoundReq,
    performInnerQuery,
    performQueryFromReq,
    performSimpleOneQuery,
    removeBodyParametersIgnoreCase
} from "./generic.js";
import statusCodes from "http-status-codes";
import {performQuery} from "../database/database.js";


export function getSprints(req, res) {
    return badRequestOnly(req, res);
}

export function getSprintById(req, res) {
    return notFoundReq(req, res);
}

export function addNewSprint(req, res) {
    if(isBlank(req.body.title)) return res.status(400).json({error: "Title missing in body."})
    if(!isValidDate(req.body.startdate)) return res.status(400).json({error: "Invalid start date."})
    if(!isValidDate(req.body.duedate)) return res.status(400).json({error: "Invalid end date."})
    req.body.title = req.body.title.trim();

    return badRequestOnly(req, res);
}

export function editSprintBySprintId(req, res) {
    if(req.body.title) {
        req.body.title = req.body.title.trim();
    }

    return badRequestOnly(req, res);
}

export function removeSprintById(req, res) {
    return badRequestOnly(req, res);
}

export async function restartSprint(req, res) {
    const existingSprint = await performSimpleOneQuery('sprint', 'get', 'sprintid', req.params.sprintId);
    if (!existingSprint[0]) return res.status(statusCodes.NOT_FOUND).json({error: "Nothing was found."});

    if (!isValidDate(req.body.startdate) || !isValidDate(req.body.duedate)) {
        const startDate = new Date(existingSprint[0].startdate);

        const dueDate = new Date(existingSprint[0].duedate);
        const durationInMilliseconds = dueDate - startDate;

        const durationInDays = durationInMilliseconds / (1000 * 60 * 60 * 24);

        removeBodyParametersIgnoreCase(req, 'duedate, startdate');
        req.body.startdate = existingSprint[0].duedate.toISOString();
        req.body.duedate = new Date(dueDate.getTime() + durationInDays * (1000 * 60 * 60 * 24)).toISOString();
    }

    if (isBlank(req.body.title)) {
        req.body.title = existingSprint[0].title;
    }

    // Create the new sprint
    const insertResult = await performQueryFromReq(req).then((result) => {
        return result;
    });
    if (!Array.isArray(insertResult)) return res.status(400).json(insertResult);

    // Get Id of new sprint
    const getIdResult = await performInnerQuery('sprint', 'get',{ordering: "sprintId"},{},{})

    // Copy data from old sprint to new sprint
    const result = await performInnerQuery('testing', 'get', {
        sprintid: req.params.sprintId + ";Equals",
        columns: 'testid'
    }, {}, {})

    if(result.length !== 0) {
        const valuesClause = result.map(item => `(${item.testid}, ${getIdResult[0].sprintid})`).join(', ');
        const query = `
        INSERT INTO testing (testid, sprintId)
        VALUES
            ${valuesClause};
    `;
        await performQuery(query);
    }

    return res.status(201).json({sprintid: getIdResult[0].sprintid});
}
