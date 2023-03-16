import * as express from "express";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";

import {AuthRouter} from "./routes/auth.route";

dotenv.config();

const app = express();
const port = 8080;

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL || "")
  .then(() => console.log("Connected to MongoDB"));

app.use("/api", AuthRouter);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
