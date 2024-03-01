import express from 'express';
import {getStatusById, getStatusQuery} from "../controllers/status-controller.js";
import {isLoggedIn} from "../middleware/middlewares.js";

const router = express.Router();

router.get("/", isLoggedIn, getStatusQuery);
router.get("/:statusid", isLoggedIn, getStatusById);

export default router;