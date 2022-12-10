import { JwtPayload } from "jsonwebtoken";
import { Request } from "express";

interface AuthorizationRequest extends Request {
  token: string | JwtPayload;
}

export default AuthorizationRequest;
