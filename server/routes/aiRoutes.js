import express from "express"
import { enhanceJobDescription, enhanceProfessinalSummary, uploadResume } from "../controllers/aiController.js";
import protect from "../middlewares/authMiddlewares.js";
import upload from "../configs/multer.js";

const aiRouter = express.Router();

aiRouter.post('/enhance-pro-sum', protect, enhanceProfessinalSummary);
aiRouter.post('/enhance-job-desc', protect, enhanceJobDescription);
aiRouter.post('/upload-resume', protect, upload.single('resumeFile'), uploadResume);

export default aiRouter;
