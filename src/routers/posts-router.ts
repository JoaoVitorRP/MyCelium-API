import { Router } from "express";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { getPosts } from "../controllers/posts-controller";

const postsRouter = Router();

postsRouter.all("/*", authenticateToken).get("/", getPosts);

export { postsRouter };
