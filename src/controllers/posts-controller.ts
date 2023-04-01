import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware";
import { postsService } from "../services";
import httpStatus from "http-status";

export async function getPosts(req: AuthenticatedRequest, res: Response) {
  try {
    const posts = await postsService.getPosts();

    return res.status(httpStatus.OK).send(posts);
  } catch (err) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
