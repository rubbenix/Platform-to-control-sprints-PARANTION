import express from "express";
import {getAll, postTesting} from "../controllers/testing-controller.js";
import { getTestAssignee, updateTestAssignee, updateTestStatus} from "../controllers/testing-controller.js";
import {isLoggedIn} from "../middleware/middlewares.js";

const router = express.Router();

router.get('/', getAll);
router.get('/:sprintid/assignee/:testid', isLoggedIn, getTestAssignee)

router.put('/:sprintid/status/:testid', isLoggedIn, updateTestStatus)
router.put('/:sprintid/assignee/:testid', isLoggedIn, updateTestAssignee)

router.post('/', isLoggedIn, postTesting)

export default router;