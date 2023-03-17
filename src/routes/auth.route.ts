// authnetication route
import { Router } from "express";
import { register} from "../controllers/auth.controller";
import { validateRegister } from "../middlewares/auth.middleware";

const router = Router();

router.post("/register", validateRegister, register);

export const AuthRouter = router;