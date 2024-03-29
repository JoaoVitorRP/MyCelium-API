import { Response } from "express";
import { AuthenticatedRequest } from "../middlewares/authentication-middleware";
import { postsService } from "../services";
import httpStatus from "http-status";
import { CreatePostBody } from "../protocols";

export async function getPosts(req: AuthenticatedRequest, res: Response) {
  try {
    const posts = await postsService.getPosts();

    return res.status(httpStatus.OK).send(posts);
  } catch (err) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getPostsBySpecies(req: AuthenticatedRequest, res: Response) {
  const { species } = req.params;

  try {
    const posts = await postsService.getPostsBySpecies(species);

    return res.status(httpStatus.OK).send(posts);
  } catch (err) {
    if (err.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function getTrendings(req: AuthenticatedRequest, res: Response) {
  const { limit } = req.query;

  try {
    const trendings = await postsService.getTrendings(Number(limit));

    return res.status(httpStatus.OK).send(trendings);
  } catch (err) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function createPost(req: AuthenticatedRequest, res: Response) {
  const body = req.body as CreatePostBody;
  const { userId } = req;

  try {
    await postsService.createPost({ user_id: userId, ...body });

    return res.sendStatus(httpStatus.CREATED);
  } catch (err) {
    if (err.name === "ForbiddenError") return res.sendStatus(httpStatus.FORBIDDEN);

    if (err.message === "Your request contains invalid file parameter. The file size exceeds 26214400 bytes limit.") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
