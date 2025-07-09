import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import blogRoutes from "./routes/blogs.routes";
import path from "path";

const app: Express = express();

dotenv.config();

app.use(express.json());
app.use(
  cors({
    origin: "https://localhost:5173/",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  })
);
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.send("<h1>Welcome to BlogIt</h1>");
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/blogs", blogRoutes);

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Server running on port ${port}`));
