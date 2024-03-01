import pkg from 'pg';
import dotenv from 'dotenv';
import {performSimpleOneQuery} from "../controllers/generic.js";

const {Pool} = pkg;
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


/**
 * Executes a query in the database, and returns the data found. Can be one generated automatically, or custom one
 * with replacement positions ($1).
 * <p> Example: </p>
 * <p> return performQueryInputAnswers('SELECT * FROM test WHERE status = \'bug\' OR status = \'blocker\''); </p>
 * <p> return performQueryInputAnswers('SELECT * FROM test WHERE status = $1 OR status = $2', ['bug', 'blocker']); </p>
 * @param query Generate query and pass it, or enter your own custom query, if it uses replacement
 * positions, put ${number} for every parameter the query takes. Start from 1 and increment by one.
 * @param answers An array which contains the replacements for the ${number}.
 * @returns Returns an array of all data found.
 */
export async function performQuery(query, answers = []) {
    const client = await pool.connect();

    try {
        return await new Promise((resolve, reject) => {
            client.query(query, answers, (err, result) => {
                if (err) {
                    console.error('Error executing query', err);
                    reject(err);
                } else {
                    resolve(result.rows || []);
                }
            });
        });
    } finally {
        client.release();
    }
}

export async function fixDummyCompletionDateData() {
    const sprintData = await performSimpleOneQuery('sprint', 'get');
    const testData = await performSimpleOneQuery('testing', 'get');

    for (const test of testData) {
        const correspondingSprint = sprintData.find(sprint => sprint.sprintid === test.sprintid);

        if (correspondingSprint) {
            const randomDate = generateRandomDate(new Date(correspondingSprint.startdate), new Date(correspondingSprint.duedate));
            await performQuery(`
                UPDATE testing
                SET completionDate = $1
                WHERE sprintid = $2
                  AND testid = $3
                  AND statusid = 2
            `, [randomDate, test.sprintid, test.testid]);
        }
    }
}

function generateRandomDate(startDate, endDate) {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();

    // Calculate a random timestamp within the entire range (including the first and last day)
    const randomTimestamp = startTimestamp + Math.random() * (endTimestamp - startTimestamp);

    return new Date(randomTimestamp);
}