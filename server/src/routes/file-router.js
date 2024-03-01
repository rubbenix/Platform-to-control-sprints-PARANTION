import express from 'express';
import multer from "multer";
import {
    getAttachment,
    getAttachmentIds,
    handleFileUpload
} from "../controllers/file-upload-controller.js";
import {isLoggedIn} from "../middleware/middlewares.js";

const router = express.Router({mergeParams:true});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), handleFileUpload);
router.get('/', getAttachmentIds)
router.get('/:attachmentId', getAttachment);
export default router;