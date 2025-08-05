import { Request, Response, NextFunction } from "express";
import commentModel from "../model/commentModel";

export default class CommentController {
  static async addCommentGet(req: Request, res: Response, next: NextFunction) {
    const { postId } = req.params;
    res.render("partial/addComment", { postId });
  }

  static async getAllCommentsOfPost(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { postId } = req.params;
      if (!postId) return next(new Error("postId not found"));
      const comments = await commentModel.getAllCommentsOfPost(
        parseInt(postId),
      );
      res.render("comments", { comments });
    } catch (err) {
      return next(err);
    }
  }

  static async addComment(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("postId from params:", req.params.postId);
      const postId = parseInt(req.params.postId);
      if (!req.user) {
        return next(new Error("user not found"));
      }
      const userId = req.user.id;
      const { comment } = req.body;
      const c = {
        postId,
        userId,
        comment,
      };
      console.log(postId, "this is postId");
      console.log(userId, "this is userId");
      console.log(comment, "this is comment");

      await commentModel.addComment(c);
      res.redirect(`/comments/${postId}`);
    } catch (err) {
      next(err);
    }
  }
}
