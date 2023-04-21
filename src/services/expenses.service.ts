import Expense from "../models/expense.model";

const getExpensesByUser = async (userId: string | undefined) => {
    try {
        const expenses = await Expense.find({ user: userId });
        return expenses;
    } catch (error) {
        throw new Error("Could not retrieve expenses for user: " + userId);
    }
};

export const ExpensesService = {
    getExpensesByUser
};