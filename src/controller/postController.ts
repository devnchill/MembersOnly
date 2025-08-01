import { Request, Response, NextFunction } from "express";
import PostModel from "../model/postModel";

export default class PostController {
  static createPostGet(req: Request, res: Response) {
    res.render("createPost");
  }

  static async createPostPost(req: Request, res: Response, next: NextFunction) {
    const { title, content } = req.body;
    const userId = res.locals.currentUser.id;
    const post = {
      title,
      content,
      userId,
    };
    console.log(post);
    const createdPost = await PostModel.createPost(post);
    if (!createdPost) {
      return next("Post Couldn't be created");
    }
    res.redirect("/");
  }
}
