//import db from ...;

/*Name character varying(255) NOT NULL,
    UserID integer DEFAULT null,
    Description character varying(255) DEFAULT null,
    Status character varying(255) DEFAULT null,
    CompletionDate date DEFAULT null,*/

export function addTest(test) {
    const INSERT_TEST = 'INSERT INTO test (name, description, status, completiondate) VALUE (?, ?, ?, ?, ?);';
    const stmt = db.prepare(INSERT_TEST);
    stmt.run(test.name, test.description, test.status, test.completiondate);
}

export function getAllTests() {
    const SELECT_TESTS = 'SELECT * FROM test;';
    const stmt = db.prepare(SELECT_TESTS);
    return stmt.all();
}

export function getTestById(id) {
    const SELECT_TEST_BY_ID = 'SELECT * FROM test WHERE id = ?;';
    const stmt = db.prepare(SELECT_TEST_BY_ID);
    return stmt.get(id);
}

export function getTestByName(name) {
    const SELECT_TEST_BY_NAME = 'SELECT * FROM test WHERE name = ?;';
    const stmt = db.prepare(SELECT_TEST_BY_NAME);
    return stmt.get(name);
}

export function deleteTest(id) {
    const DELETE_TEST = 'DELETE * FROM test WHERE id = ?;';
    const stmt = db.prepare(DELETE_TEST);
    stmt.run(id);
}

export function editTest(test) {
    const DELETE_TEST = 'UPDATE test SET title = ?, userID = ?, description = ?, status = ? WHERE id = ?;';
    const stmt = db.prepare(DELETE_TEST);
    stmt.run(test.name, test.description, test.status, test.completiondat, test.id);
}