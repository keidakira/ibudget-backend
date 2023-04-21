import { Request, Response, NextFunction } from "express";

const validateRetrieveExpensesByUserId = (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    if (!user) {
        return res.status(400).json({ error: "User is required" });
    }
    next();
};

export {
    validateRetrieveExpensesByUserId
};