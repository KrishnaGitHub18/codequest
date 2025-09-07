import express from "express";
import User from "../../models/userModel.js";

const router = express.Router();

router.post("/signin", async (req, res) => {
  try {
    const { mailId, password } = req.body;

    if (!mailId || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ mailId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (user.password !== password) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    res.status(200).json({
      message: "Signin successful",
      user: { id: user._id, name: user.name, mailId: user.mailId },
    });
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
