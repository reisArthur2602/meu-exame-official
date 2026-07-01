import jwt from "jsonwebtoken";

import { env } from "@/lib/env";

export const SESSION_COOKIE_NAME = "meulaudo_session";

export type SessionPayload = {
  userId: string;
};

export const signToken = (payload: SessionPayload) => {
  return jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, env.JWT_SECRET) as SessionPayload;
};
