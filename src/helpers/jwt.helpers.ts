import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET;

export const generateToken = (payload) => {
    return jwt.sign(payload, SECRET, { expiresIn: "1h" });
};

export const verifyToken = (token) => {
    return jwt.verify(token, SECRET);
};