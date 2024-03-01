import express from 'express';
import {getById,addbyId} from "../controllers/test-module-controller.js";
import {isDeveloper, isLoggedIn} from "../middleware/middlewares.js";

const router = express.Router();

router.get('/', isLoggedIn, getById);
router.get("/module/:moduleid", isLoggedIn, getById);
router.get("/test/:testid", isLoggedIn, getById);
router.post('/',isLoggedIn, isDeveloper, addbyId);

export default router;