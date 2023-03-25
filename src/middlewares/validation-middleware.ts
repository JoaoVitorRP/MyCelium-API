import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import Joi from "joi";

export function validateBody(schema: Joi.ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(httpStatus.BAD_REQUEST).send({ message: "Invalid data", details: error.message });
    }

    return next();
  };
}
