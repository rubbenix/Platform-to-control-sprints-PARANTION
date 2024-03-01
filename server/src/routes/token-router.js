import express from "express";
import * as tokenController from '../controllers/token-controller.js';

const router = express.Router();

router.post("/", tokenController.checkToken);

export default router;