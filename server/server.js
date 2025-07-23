import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import booksRouter from "./routes/books.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API routes
app.use("/api/books", booksRouter);

// Root route
app.get("/", (req, res) => {
  res.send("🟢 API is running");
});

// Serve frontend static files
app.use(express.static(path.join(__dirname, "public")));

// React route fallback
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server and DB
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected ✅"))
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

// NOTE: If deploying React, ensure the build output is served from the correct directory, e.g.:
// app.use(express.static(path.join(__dirname, "../client/dist")));
