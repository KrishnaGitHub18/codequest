import express from "express";
import User from "../../models/userModel.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const { name, mailId, password } = req.body;

    if (!name || !mailId || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ mailId });
    if (existingUser) {
      return res.status(409).json({ error: "User already exists" });
    }
    
    const newUser = new User({ name, mailId, password });
    await newUser.save();

    res.status(201).json({
      message: "User registered successfully",
      user: { id: newUser._id, name: newUser.name, mailId: newUser.mailId }
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
