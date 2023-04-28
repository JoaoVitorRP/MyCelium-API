import { Router } from "express";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { createPost, getPosts, getTrendings } from "../controllers/posts-controller";
import { validateBody } from "../middlewares/validation-middleware";
import { createPostSchema } from "../schemas/create-post-schema";
import multer from "multer";

const upload = multer({ limits: { fieldSize: 25 * 2048 * 2048 } });

const postsRouter = Router();

postsRouter
  .all("/*", authenticateToken)
  .get("/", getPosts)
  .get("/trendings", getTrendings)
  .post("/", upload.none(), validateBody(createPostSchema), createPost);

export { postsRouter };
