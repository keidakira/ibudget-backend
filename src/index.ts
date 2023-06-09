import express from "express";
import * as mongoose from "mongoose";
import * as dotenv from "dotenv";

import {AuthRouter} from "./routes/auth.route";
import { ExpensesRouter } from "./routes/expenses.route";

dotenv.config();

export const app = express();
const port = 8080;

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URL || "")
  .then(() => console.log("Connected to MongoDB"));

app.use("/api", AuthRouter);
app.use("/api/expenses", ExpensesRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
