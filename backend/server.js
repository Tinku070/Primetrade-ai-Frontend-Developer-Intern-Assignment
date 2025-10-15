import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import authRoutes from "./src/routes/authRoutes.js";
import taskRoutes from "./src/routes/taskRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => res.send("Backend running..."));

app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
