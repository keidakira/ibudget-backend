import { Request, Response, NextFunction } from "express";

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!(name && email && password && confirmPassword)) {
        res.status(400).send();
    }

    next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).send();
    }

    next();
};