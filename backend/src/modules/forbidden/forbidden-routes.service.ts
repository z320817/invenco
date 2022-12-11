import { Request, Response, NextFunction } from "express";
import HttpException from "../../providers/exceptions/general/http.exception";

class ForbiddenRoutesService {
  constructor() {}

  public sendForbiddenResponse = () => {
    throw new HttpException(
      403,
      "The URL you are trying to reach is forbidden."
    );
  };
}

export default ForbiddenRoutesService;
