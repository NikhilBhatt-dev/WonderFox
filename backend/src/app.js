import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import productRoutes from "./routes/product.routes.js";
import categoryRoutes from "./routes/category.routes.js";
import cartRoutes from "./routes/cart.routes.js";
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



app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
/* =========================
   Health Check Route
========================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "WonderFox Backend Running 🚀",
  });
});

// Error middleware should be LAST
app.use(errorMiddleware);

export default app;