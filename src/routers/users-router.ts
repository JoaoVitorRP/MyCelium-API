import { Router } from "express";
import { postUser, signIn, validateUser } from "../controllers/users-controller";
import { validateBody } from "../middlewares/validation-middleware";
import multer from "multer";
import { signUpSchema, validateUserSchema } from "../schemas";
import { signInSchema } from "../schemas/sign-in-schema";

const upload = multer({ limits: { fieldSize: 25 * 2048 * 2048 } });

const usersRouter = Router();

usersRouter
  .post("/sign-up/validate", validateBody(validateUserSchema), validateUser)
  .post("/sign-up", upload.none(), validateBody(signUpSchema), postUser)
  .post("/sign-in", validateBody(signInSchema), signIn);

export { usersRouter };
