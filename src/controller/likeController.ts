import { Request, Response, NextFunction } from "express";
import postModel from "../model/postModel";

export default class LikeController {
  static async likePost(req: Request, res: Response, next: NextFunction) {
    try {
      const postId = parseInt(req.params.postId);
      if (!req.user) {
        return next(new Error("user not found"));
      }
      const userId = req.user.id;
      await postModel.likePost(userId, postId);
      res.redirect(`/`);
    } catch (err) {
      next(err);
    }
  }
}
