import express from "express";
import User from "../../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, mailId, password: hashedPassword });
    await newUser.save();

    const jwtSecret = process.env.JWTSECRET;
    if (!jwtSecret) {
      throw new Error("JWTSECRET is not defined in environment");
    }

    const token = jwt.sign(
      { id: newUser._id, mailId: newUser.mailId },
      jwtSecret,
      { expiresIn: "7d" } 
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { id: newUser._id, name: newUser.name, mailId: newUser.mailId },
    });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
