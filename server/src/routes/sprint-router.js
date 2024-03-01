import express from 'express';
import * as controller from '../controllers/sprint-controller.js';
import {restartSprint} from "../controllers/sprint-controller.js";
import {isAdmin, isLoggedIn} from "../middleware/middlewares.js";

const router = express.Router();

router.get("/", isLoggedIn, controller.getSprints);
router.get("/:sprintId", isLoggedIn, controller.getSprintById);

router.post("/", isLoggedIn, isAdmin, controller.addNewSprint);
router.post("/:sprintId", isLoggedIn, isAdmin, restartSprint)

router.put("/:sprintId", isLoggedIn, isAdmin, controller.editSprintBySprintId);

router.delete("/:sprintId", isLoggedIn, isAdmin, controller.removeSprintById);

export default router;