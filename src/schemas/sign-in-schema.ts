import Joi from "joi";
import { SignIn } from "../protocols";

export const signInSchema = Joi.object<SignIn>({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
