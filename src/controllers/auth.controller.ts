import { Request, Response } from "express";
import UserService from "../services/user.service";
import ApiResponse from "../helpers/api-response.helpers";
import { generateToken } from "../helpers/jwt.helpers";

export const register = async (req: Request, res: Response) => {
    const { name, email, password, confirmPassword } = req.body;
    const response = new ApiResponse();

    try {
        const user = await UserService.createUser({ name, email, password, confirmPassword });
        response.status = 201;
        response.message = "User created successfully";
        response.data = {
            email: user.email,
            token: generateToken({ email: user.email })
        };
    } catch (error) {
        response.error = true;
        response.status = 400;
        response.message = error.message;
    }

    return res.status(response.status).json(response.json());
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const response = new ApiResponse();

    try {
        const user = await UserService.loginUser({ email, password });
        response.status = 200;
        response.message = "User logged in successfully";
        response.data = {
            email: user.email,
            token: generateToken({ email: user.email })
        };
    } catch (error) {
        response.error = true;
        response.status = 400;
        response.message = "Invalid credentials";
    }

    return res.status(response.status).json(response.json());
};