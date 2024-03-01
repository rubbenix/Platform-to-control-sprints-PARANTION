import express from "express";
import {deleteQuery, getQuery, getTestStepById, postQuery, putQuery} from "../controllers/teststep-controller.js";
import fileRouter from "./file-router.js";
import {isDeveloper, isLoggedIn} from "../middleware/middlewares.js";

const router = express.Router({mergeParams:true});

router.use('/:stepid/attachment', fileRouter);

router.get('/', isLoggedIn, getQuery);
router.get('/:stepid', isLoggedIn, getTestStepById);

//Middleware doesnt work yet
router.put('/:stepid', isLoggedIn ,putQuery);
router.delete('/:stepid', isLoggedIn, isDeveloper, deleteQuery);
router.post('/', isLoggedIn, isDeveloper, postQuery);
export default router;
