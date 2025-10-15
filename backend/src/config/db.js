import sqlite3 from "sqlite3";
import { open } from "sqlite";

export const initDB = async () => {
  const db = await open({
    filename: "./database/database.sqlite",
    driver: sqlite3.Database,
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT UNIQUE,
      password TEXT
    );
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      title TEXT,
      description TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  return db;
};
