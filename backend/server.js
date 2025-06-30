import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./config/mongodb.js";
import connect_Cloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoutes.js";

import serverless from "serverless-http"; // ✅ NEW: Add serverless-http

// App config
const app = express();

// Connect to DB and cloud
connectDB();
connect_Cloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

// API routes
app.get("/", (req, res) => {
  res.send("API working");
});

app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// ❌ REMOVE: app.listen(...) — Vercel doesn't need this
// ✅ Instead, export the app as a serverless function
export default serverless(app);
console.log("🚀 Backend is running in serverless mode");

