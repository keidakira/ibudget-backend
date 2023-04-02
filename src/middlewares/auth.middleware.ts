import { Request, Response, NextFunction } from "express";
import ApiResponse from "../helpers/api-response.helpers";

export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
    const { name, email, password, confirmPassword } = req.body;
    if (!(name && email && password && confirmPassword)) {
        const apiResponse = new ApiResponse();
        apiResponse.error = true;
        apiResponse.status = 400;
        apiResponse.message = "All fields are required";

        return res.status(apiResponse.status).send(apiResponse.json());
    }

    next();
};

export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        const apiResponse = new ApiResponse();
        apiResponse.error = true;
        apiResponse.status = 400;
        apiResponse.message = "All fields are required";

        return res.status(apiResponse.status).send(apiResponse.json());
    }

    next();
};