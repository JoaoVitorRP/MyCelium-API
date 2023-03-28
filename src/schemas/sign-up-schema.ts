import Joi from "joi";
import { SignUp } from "../protocols";

export const signUpSchema = Joi.object<SignUp>({
  user: Joi.string().min(3).max(16).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  name: Joi.string().min(3).max(30).required(),
  picture: Joi.string(),
});
