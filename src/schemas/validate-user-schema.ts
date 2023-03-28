import Joi from "joi";
import { ValidateUser } from "../protocols";

export const validateUserSchema = Joi.object<ValidateUser>({
  user: Joi.string().min(3).max(16).required(),
  email: Joi.string().email().required(),
});
