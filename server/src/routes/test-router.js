import express from "express";
import {
    getQuery,
    postQuery,
    putQuery,
    getTestById,
    putTestById,
    deleteTest, getTotalWeight
} from "../controllers/test-controller.js";
import testStepRouter from "./teststep-router.js";
import moduleRouter from "./module-router.js";
import {isDeveloper, isLoggedIn} from "../middleware/middlewares.js";
const router = express.Router();

router.use('/:testid/teststeps', testStepRouter);

router.get('/', getQuery);
router.get('/:testid', isLoggedIn, getTestById);
router.get('/:testid/weight', isLoggedIn, getTotalWeight);
router.use('/:testid/module',moduleRouter)
router.put('/:testid', isLoggedIn, isDeveloper, putTestById);
router.put('/', isLoggedIn, isDeveloper, putQuery);

router.delete('/:testid', isLoggedIn, isDeveloper, deleteTest);

router.post('/', isLoggedIn, isDeveloper, postQuery);

export default router;