import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./config/mongodb.js";
import connect_Cloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoutes.js";

const app = express();

// ✅ CORS setup (no credentials needed)
app.use(cors({
  origin: "https://docon-ui.onrender.com",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// ✅ Optional: Handle preflight requests (safe)
app.options("*", cors({
  origin: "https://docon-ui.onrender.com"
}));

// ✅ Connect to DB and Cloudinary
connectDB();
connect_Cloudinary();

// ✅ Body parser middleware
app.use(express.json());

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API working");
});

// ✅ API routes
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

// ✅ Start server
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server started on port", port);
});
