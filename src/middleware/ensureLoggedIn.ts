import { Request, Response, NextFunction } from "express";
export default function ensureLoggedIn(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.isAuthenticated?.() && req.user) {
    return next();
  }
  return res.status(401).render("loginFirst", {
    message: "You need to be logged in to do that.",
  });
}
