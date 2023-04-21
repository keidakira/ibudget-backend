import ApiResponse from "../helpers/api-response.helpers";
import UserService from "../services/user.service";

import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../helpers/jwt.helpers";

const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const jwtToken = req.headers.authorization?.split(" ")[1];

    const apiResponse = new ApiResponse();

    if (!jwtToken) {
        apiResponse.message = "Unauthorized";
        apiResponse.status = 401;
        apiResponse.error = true;

        return res.status(apiResponse.status).send(apiResponse.json());
    }

    try {
        const data = verifyToken(jwtToken);
        const user = await UserService.getUserByEmail(data.email);

        if (!user) {
            apiResponse.message = "Unauthorized";
            apiResponse.status = 401;
            apiResponse.error = true;

            return res.status(apiResponse.status).send(apiResponse.json());
        }

        req.body.user = user;
        next();
    } catch (error) {
        apiResponse.message = "Unauthorized";
        apiResponse.status = 401;
        apiResponse.error = true;

        return res.status(apiResponse.status).send(apiResponse.json());
    }
};

export default validateJWT;