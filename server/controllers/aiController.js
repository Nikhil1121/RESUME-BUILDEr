import Resume from "../models/Resume.js";
import ai from "../configs/ai.js";
import fs from "fs";
import { createRequire } from "module";

// FIX: pdf-parse is CommonJS — use createRequire in ESM project
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse");

// POST /api/ai/enhance-pro-sum
export const enhanceProfessinalSummary = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) return res.status(400).json({ message: 'Missing content' });

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: "You are an expert resume writer. Enhance the professional summary in 2-3 compelling, ATS-friendly sentences. Return only the text, nothing else." },
                { role: "user", content: userContent },
            ],
        });

        return res.status(200).json({ enhanceContent: response.choices[0].message.content });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// POST /api/ai/enhance-job-desc
export const enhanceJobDescription = async (req, res) => {
    try {
        const { userContent } = req.body;
        if (!userContent) return res.status(400).json({ message: 'Missing content' });

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: "You are an expert resume writer. Enhance this job description using strong action verbs and quantifiable achievements. Make it ATS-friendly. Return only the text." },
                { role: "user", content: userContent },
            ],
        });

        return res.status(200).json({ enhanceContent: response.choices[0].message.content });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

// POST /api/ai/upload-resume  (multipart: resumeFile + title)
export const uploadResume = async (req, res) => {
    const file = req.file;
    try {
        const { title } = req.body;
        if (!file)  return res.status(400).json({ message: 'No file uploaded' });
        if (!title) return res.status(400).json({ message: 'Title is required' });

        // Extract text from PDF server-side
        let resumeText = '';
        try {
            const buffer = fs.readFileSync(file.path);
            const pdf = await pdfParse(buffer);
            resumeText = pdf.text?.trim();
        } catch (e) {
            return res.status(400).json({ message: 'Could not read PDF. Please upload a valid text-based PDF.' });
        }

        if (!resumeText || resumeText.length < 30) {
            return res.status(400).json({ message: 'PDF is empty or scanned. Please use a text-based PDF.' });
        }

        const prompt = `Extract resume data from the text below and return ONLY a valid JSON object (no markdown, no explanation):

${resumeText}

Required JSON format:
{
  "professional_summary": "",
  "skills": [],
  "personal_info": { "image": "", "full_name": "", "profession": "", "email": "", "phone": "", "location": "", "linkedin": "", "website": "" },
  "experience": [{ "company": "", "position": "", "start_date": "", "end_date": "", "description": "", "is_current": false }],
  "project": [{ "name": "", "type": "", "description": "" }],
  "education": [{ "institution": "", "degree": "", "field": "", "graduation_date": "", "gpa": "" }]
}`;

        const response = await ai.chat.completions.create({
            model: process.env.OPENAI_MODEL,
            messages: [
                { role: "system", content: "You extract structured JSON data from resume text. Return only valid JSON, no markdown fences." },
                { role: "user", content: prompt },
            ],
        });

        let raw = response.choices[0].message.content;
        raw = raw.replace(/```json|```/g, '').trim();
        const parsed = JSON.parse(raw);
        const newResume = await Resume.create({ userId: req.userId, title, ...parsed });

        return res.json({ resumeId: newResume._id });
    } catch (error) {
        // Friendlier message for common Gemini key/billing issues
        if (error.status === 403 || /403|permission.?denied/i.test(error.message)) {
            return res.status(400).json({
                message: 'AI key error: your Gemini API key is invalid, expired, or not enabled for this project. Get a fresh key from aistudio.google.com and update OPENAI_API_KEY in server/.env, then restart the server.'
            });
        }
        return res.status(400).json({ message: error.message });
    } finally {
        if (file) fs.unlink(file.path, () => {});
    }
};
