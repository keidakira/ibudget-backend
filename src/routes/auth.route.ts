// authnetication route
import { Router } from "express";
import { register, login } from "../controllers/auth.controller";
import { validateRegister, validateLogin } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

export const AuthRouter = router;