import fetch from 'node-fetch';
import {subscribedSockets} from "../websocket.js";
import {SERVER_PS_OUT_PARAMS} from "mysql/lib/protocol/constants/server_status.js";

const url = "http://localhost:3000/";

export async function sendBlockers() {
    try {
        const testingData = await fetch(`${url}testing`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });

        let testing = await testingData.json();

        const tests = await fetch(`${url}test`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
        });
        let test = await tests.json();


        let blockers = mergeTestData(testing, test).filter(test => test.statusid === 3);
        console.log(blockers);


        const clients = Array.from(subscribedSockets);
        clients.forEach(client => {
            client.send(JSON.stringify({response: "blockers", blockers}));
        });
    } catch (error) {
        console.error('Error fetching blockers:', error);
    }
}

function mergeTestData(testData, sprintTestData) {
    const testDataMap = new Map(testData.map(test => [test.testid, test]));
    for (const sprintTest of sprintTestData) {
        const testid = sprintTest.testid;

        if (testDataMap.has(testid)) {
            Object.assign(testDataMap.get(testid), sprintTest);
        }
    }

    // Convert the merged data back to an array
    const mergedData = Array.from(testDataMap.values());

    return mergedData;
}