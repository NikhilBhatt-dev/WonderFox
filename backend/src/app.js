import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

/* =========================
   Middlewares
========================= */

app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.ADMIN_URL],
    credentials: true,
  }),
);

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));

/* =========================
   Health Check Route
========================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "WonderFox Backend Running 🚀",
  });
});

export default app;
