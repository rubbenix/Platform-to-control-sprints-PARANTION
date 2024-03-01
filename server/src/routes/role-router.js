import express from "express";
import * as roleController from '../controllers/role-controller.js';
import {isLoggedIn} from "../middleware/middlewares.js";

const router = express.Router();
router.get("/", isLoggedIn, roleController.getAllroles);

export default router;
