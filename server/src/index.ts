import express, { Express } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";

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

app.use("/auth", authRoutes);

const port = process.env.PORT || 3500;
app.listen(port, () => console.log(`Server running on port ${port}`));
