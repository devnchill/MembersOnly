import { Request, Response, NextFunction } from "express";

export default class loginController {
  static loginGet = (req: Request, res: Response, next: NextFunction) => {
    try {
      const messages = req.session.messages || [];
      const message = messages.length > 0 ? messages[0] : null;
      req.session.messages = [];
      res.render("login", { message });
    } catch (err) {
      return next(err);
    }
  };
}
