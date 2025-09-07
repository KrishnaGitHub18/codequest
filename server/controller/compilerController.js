import express from "express";
import axios from "axios";

const router = express.Router();

router.post("/run", async (req, res) => {
  const { language_id, source_code, stdin } = req.body;

  try {
    const response = await axios.post(
      "https://judge0-extra-ce.p.rapidapi.com/submissions",
      {
        language_id,
        source_code,
        stdin,
      },
      {
        params: {
          base64_encoded: "false",
          wait: "true",  
          fields: "*",
        },
        headers: {
          "x-rapidapi-key": process.env.RAPIDAPI_KEY,
          "x-rapidapi-host": "judge0-extra-ce.p.rapidapi.com",
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("❌ Judge0 error:", error.response?.data || error.message);
    res
      .status(error.response?.status || 500)
      .json({ error: "Failed to submit code" });
  }
});

export default router;
