import { NextFunction, Request, Response } from "express";
import HttpException from "../providers/exceptions/general/http.exception";

const ForbiddedPathMiddleware = (
  error: HttpException,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  response.redirect("/forbidden-route");
};

export default ForbiddedPathMiddleware;
