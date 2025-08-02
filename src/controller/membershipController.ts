import { Request, Response, NextFunction } from "express";
import userModel from "../model/userModel";

export default class MemberShip {
  static async elevateGet(req: Request, res: Response, next: NextFunction) {
    res.render("partial/membership");
  }

  static async elevatePost(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user) {
        return res.status(401).render("error", {
          message: "You need to be logged in to access membership.",
        });
      }
      const { smartness } = req.body;
      if (smartness === "no") {
        const { id } = req.user as { id: number };
        const isMember = true;
        await userModel.updateMembershipStatus(id, isMember);
        res.redirect("/");
      } else {
        return res.send("Nice try... but smart people can't be members ");
      }
    } catch (err) {
      next(err);
    }
  }
}
