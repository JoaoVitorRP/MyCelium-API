import { Request, Response } from "express";
import httpStatus from "http-status";
import { SignIn, SignUp, ValidateUser } from "../protocols";
import { usersService } from "../services";

export async function validateUser(req: Request, res: Response) {
  const body = req.body as ValidateUser;

  try {
    await usersService.validateUser(body.email, body.user);

    return res.sendStatus(httpStatus.OK);
  } catch (err) {
    if (err.name === "ConflictError") return res.status(httpStatus.CONFLICT).send({ message: err.message });

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function postUser(req: Request, res: Response) {
  const body = req.body as SignUp;

  try {
    await usersService.postUser(body);

    return res.sendStatus(httpStatus.CREATED);
  } catch (err) {
    if (err.name === "ConflictError") return res.status(httpStatus.CONFLICT).send({ message: err.message });

    if (err.message === "Your request contains invalid file parameter. The file size exceeds 26214400 bytes limit.") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function signIn(req: Request, res: Response) {
  const body = req.body as SignIn;

  try {
    const userData = await usersService.signIn(body);

    return res.status(httpStatus.OK).send(userData);
  } catch (err) {
    if (err.name === "UnauthorizedError") return res.sendStatus(httpStatus.UNAUTHORIZED);

    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
