import { Request, Response } from "express";
import httpStatus from "http-status";
import { SignUp } from "../protocols";
import { usersService } from "../services";

export async function postUser(req: Request, res: Response) {
  const body = req.body as SignUp;

  try {
    await usersService.postUser(body);
    return res.sendStatus(httpStatus.CREATED);
  } catch (err) {
    if (err.name === "ConflictError") return res.sendStatus(httpStatus.CONFLICT);

    if (err.message === "Your request contains invalid file parameter. The file size exceeds 26214400 bytes limit.") {
      return res.sendStatus(httpStatus.BAD_REQUEST);
    }
  }
}
