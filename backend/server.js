import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./config/mongodb.js";
import connect_Cloudinary from "./config/cloudinary.js";
import adminRouter from "./routes/adminRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import userRouter from "./routes/userRoutes.js";


// app config


const app = express();

const port = process.env.PORT || 4000;
connectDB();
connect_Cloudinary();

// middlewares
app.use(express.json());

app.use(cors());

// api end point
app.get("/", (req, res) => {
  res.send("api working");
});

app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);
app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log("server started", port);
});
