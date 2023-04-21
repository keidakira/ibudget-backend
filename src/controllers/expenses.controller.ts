import { ExpensesService } from "../services/expenses.service";
import { Request, Response } from "express";

/**
 * Expenses Controller
 */
const retrieveExpensesByUserId = async (req: Request, res: Response) => {
    try {
        const expenses = await ExpensesService.getExpensesByUser(req.body.user);
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const ExpensesController = {
    retrieveExpensesByUserId
};