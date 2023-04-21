import validateJWT from "../middlewares/author.middleware";
import { Router } from "express";
import { ExpensesController } from "../controllers/expenses.controller";

const router = Router();

router.get("/", validateJWT, ExpensesController.retrieveExpensesByUserId);

export const ExpensesRouter = router;