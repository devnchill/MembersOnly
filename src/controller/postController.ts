import { Request, Response, NextFunction } from "express";
import PostModel from "../model/postModel";

export default class PostController {
  static createPostGet(_req: Request, res: Response) {
    res.render("partial/createPost");
  }

  static async createPostPost(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).render("partial/error", {
          message: "Title and content are required.",
          stack: "",
        });
      }
      const userId = res.locals.currentUser.id;
      const post = { title, content, userId };
      const createdPost = await PostModel.createPost(post);
      if (!createdPost) {
        return next(new Error("Post couldn't be created"));
      }
      res.status(303).redirect("/");
    } catch (err) {
      next(err);
    }
  }

  static async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const deletedCount = await PostModel.deletePost(parseInt(id));
      if (deletedCount === 0) {
        return res.status(404).render("partial/error", {
          message: "Post not found.",
          stack: "",
        });
      }
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
}
