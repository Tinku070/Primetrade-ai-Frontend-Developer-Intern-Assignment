import { initDB } from "../config/db.js";

export const getTasks = async (req, res) => {
  const db = await initDB();
  const tasks = await db.all("SELECT * FROM tasks WHERE user_id = ?", [req.user.id]);
  res.json(tasks);
};

export const addTask = async (req, res) => {
  const db = await initDB();
  const { title, description } = req.body;
  await db.run("INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)", [
    req.user.id,
    title,
    description,
  ]);
  res.json({ message: "Task added" });
};

export const deleteTask = async (req, res) => {
  const db = await initDB();
  await db.run("DELETE FROM tasks WHERE id = ? AND user_id = ?", [req.params.id, req.user.id]);
  res.json({ message: "Task deleted" });
};
