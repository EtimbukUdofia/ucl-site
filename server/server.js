import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import path from "path";
import fs from "fs";
import fsPromises from "fs/promises";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
// const logFilePath = path.join(__dirname, "log", "access.log");

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use(
  morgan("common", {
    skip: function (req, res) {
      return res.statusCode < 400;
    },
  })
);

if (process.env.NODE_ENV === "development") {
  app.use(
    morgan("common", {
      stream: fs.createWriteStream(path.join(__dirname, "log", "access.log"), {
        flags: "a",
      }),
    })
  );
}

app.get("/", (req, res) => {
  return res.status(200).json({ success: true, message: "Hello from server" });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint not found",
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: `Internal Server Error` });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
