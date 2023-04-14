import Joi from "joi";
import { CreatePostBody } from "../protocols";

export const createPostSchema = Joi.object<CreatePostBody>({
  description: Joi.string().max(3000).allow(""),
  image: Joi.string().required(),
  species: Joi.string().required(),
});
