import express from 'express';
import {
    deleteModuleById,
    editLabel,
    editModule,
    getModule,
    getModuleById,
    postModule
} from "../controllers/module-controller.js";
import {isDeveloper, isLoggedIn} from "../middleware/middlewares.js";

const router = express.Router({mergeParams:true});

router.get("/", isLoggedIn, getModule);
router.get('/:moduleid', isLoggedIn, getModuleById)
router.post("/", isLoggedIn, isDeveloper, postModule);
router.delete("/:moduleid", isLoggedIn, isDeveloper, deleteModuleById);
router.put("/:moduleid", isLoggedIn, isDeveloper, editModule);
router.patch("/label/:moduleid", isLoggedIn, isDeveloper, editLabel);

export default router;