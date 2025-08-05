import { TUser } from "../../src/model/userModel";

declare global {
  namespace Express {
    interface User extends TUser {}
  }
}

declare module "express-session" {
  interface SessionData {
    messages?: string[];
  }
}

export {};
