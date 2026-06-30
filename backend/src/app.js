import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import env from "./config/env.js";

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

app.use("/api/v1/test", (req, res) => {
  res.send("hello");
});

// Router Imports
import userRouter from "./routes/user.route.js";
import convesationRouter from "./routes/conversation.route.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/conversations", convesationRouter);

export default app;
