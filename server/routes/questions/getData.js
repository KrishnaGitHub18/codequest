import express from "express";
import Question from "../../models/questionsModel.js";
import middleware from '../../middleware/routeProtect.js';

const router = express.Router();

router.get("/que", middleware, async (req, res) => {
  try {
    const questions = await Question.find(); 
    res.status(200).json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ error: "Server error while fetching questions" });
  }
});

export default router;
