import Express from "express";
import dotenv from "dotenv";
import ConnectDB from "./DB/db.js";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import tweetRoutes from "./routes/tweetRoute.js";
import followRoutes from "./routes/followRoute.js";

const app = Express();
dotenv.config();
app.use(cors());
app.use(Express.json());
app.use(Express.static("public"));

app.use(Express.json());
ConnectDB();

app.use("/api/auth", authRoutes);
app.use("/api/tweet", tweetRoutes);
app.use("/api/user", followRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
