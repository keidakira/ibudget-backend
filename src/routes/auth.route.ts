import { Router } from "express";
import { login, register} from "../controllers/auth.controller";
import { validateLogin, validateRegister } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

export const AuthRouter = router;