import imagekit from "../configs/imagekit.js";
import Resume from "../models/Resume.js";
import fs from 'fs';

// POST /api/resumes/create
export const createResume = async (req, res) => {
    try {
        const { title } = req.body;
        const newResume = await Resume.create({ userId: req.userId, title });
        return res.status(201).json({ message: 'Resume created successfully', resume: newResume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// DELETE /api/resumes/delete/:resumeId
export const deleteResume = async (req, res) => {
    try {
        await Resume.findOneAndDelete({ userId: req.userId, _id: req.params.resumeId });
        return res.status(200).json({ message: 'Resume deleted successfully' });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// GET /api/resumes/get/:resumeId
export const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({ userId: req.userId, _id: req.params.resumeId });
        if (!resume) return res.status(404).json({ message: "Resume not found" });
        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// GET /api/resumes/public/:resumeId
export const getPublicResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({ public: true, _id: req.params.resumeId });
        if (!resume) return res.status(404).json({ message: "Resume not found or not public" });
        return res.status(200).json({ resume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// PUT /api/resumes/update
export const updateResume = async (req, res) => {
    try {
        const { resumeId, resumeData, removeBackground } = req.body;
        const imageFile = req.file;

        let dataToUpdate = JSON.parse(resumeData);

        // Strip File objects — only strings allowed in image field
        if (dataToUpdate.personal_info && typeof dataToUpdate.personal_info.image !== 'string') {
            dataToUpdate.personal_info.image = '';
        }

        // Upload image to ImageKit if provided
        if (imageFile) {
            try {
                const stream = fs.createReadStream(imageFile.path);
                const response = await imagekit.upload({
                    file: stream,
                    fileName: `profile-${req.userId}.jpg`,
                    folder: 'resume-builder',
                    transformation: {
                        pre: 'w-300,h-300,fo-face,z-0.75' + (removeBackground === 'true' ? ',e-bgremove' : '')
                    }
                });
                dataToUpdate.personal_info = dataToUpdate.personal_info || {};
                dataToUpdate.personal_info.image = response.url;
            } catch (imgErr) {
                console.error('ImageKit error:', imgErr.message);
                // Don't fail the save just because image upload failed
            } finally {
                fs.unlink(imageFile.path, () => {});
            }
        }

        // FIX: use $set for proper nested field updates in MongoDB
        const resume = await Resume.findOneAndUpdate(
            { userId: req.userId, _id: resumeId },
            { $set: dataToUpdate },
            { new: true, runValidators: false }
        );

        if (!resume) return res.status(404).json({ message: 'Resume not found' });
        return res.status(200).json({ message: 'Saved successfully', resume });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};
