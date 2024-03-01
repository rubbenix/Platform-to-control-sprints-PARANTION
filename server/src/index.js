import express from "express";
import cors from 'cors';
import * as fs from "fs";

import tokenRouter from "./routes/token-router.js";
import userRouter from "./routes/user-router.js";
import testsRouter from "./routes/test-router.js";
import sprintRouter from "./routes/sprint-router.js";
import {fixDummyCompletionDateData, performQuery} from "./database/database.js";
import statusRouter from "./routes/status-router.js";
import moduleRouter from "./routes/module-router.js"
import testModuleRouter from "./routes/test-module-router.js";
import roleRouter from "./routes/role-router.js";
import testingRouter from "./routes/testing-router.js";

const port = 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/token', tokenRouter);
app.use('/users', userRouter);
app.use('/test', testsRouter)
app.use('/status', statusRouter);
app.use('/module', moduleRouter)
app.use('/testmodule', testModuleRouter)
app.use('/sprint', sprintRouter);
app.use('/userrole', roleRouter);
app.use('/testing', testingRouter);

const sqlFile = fs.readFileSync('../server/src/database/DatabaseScript.sql', 'utf8');
performQuery(sqlFile).then((result) => {
    void fixDummyCompletionDateData();
});

app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
});
