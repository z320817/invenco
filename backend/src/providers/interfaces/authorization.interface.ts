import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

export interface AuthorizationRequest extends Request {
  token: string | JwtPayload;
}
