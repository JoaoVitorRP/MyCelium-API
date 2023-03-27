import { Router } from "express";
import { postUser } from "../controllers/users-controller";
import { validateBody } from "../middlewares/validation-middleware";
import { signUpSchema } from "../schemas/sign-up-schema";
import multer from "multer";

const upload = multer({ limits: { fieldSize: 25 * 2048 * 2048 } });

const usersRouter = Router();

usersRouter.post("/sign-up", upload.none(), validateBody(signUpSchema), postUser);

export { usersRouter };
