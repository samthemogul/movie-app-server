import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { rateLimit } from "express-rate-limit";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";
import authRoutes from "./routes/auth.routes";
import mongoose from "mongoose";
import watchlistRoutes from "./routes/watchlist.routes";

const app = express();

dotenv.config();

app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, //10mins
    max: 100,
    message: "Too many requests, pease try again",
    statusCode: 429,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Credentials",
    ],
  })
);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

app.use("/auth", authRoutes);
app.use('/watchlist', watchlistRoutes)

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});


mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Mongodb connected");
    app.listen(5000, () => {
      console.log("Server listening on port 5000");
    });
  })
  .catch((err) => {
    console.error(err);
  });
