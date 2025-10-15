import bcrypt from "bcryptjs";
import { generateToken } from "../utils/jwtUtils.js";
import { initDB } from "../config/db.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  const db = await initDB();

  const hashed = await bcrypt.hash(password, 10);
  try {
    await db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [
      name,
      email,
      hashed,
    ]);
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "User already exists" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const db = await initDB();
  const user = await db.get("SELECT * FROM users WHERE email = ?", [email]);

  if (!user) return res.status(400).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

  const token = generateToken(user.id);
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
};
