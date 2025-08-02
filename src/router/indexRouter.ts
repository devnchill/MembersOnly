import { Router } from "express";
import PostModel from "../model/postModel";

const indexRouter = Router();

indexRouter.get("/", async (req, res, next) => {
  try {
    res.locals.user = req.user;
    const postsWithAuthor = await PostModel.getAllPosts();
    res.render("index", { posts: postsWithAuthor });
  } catch (err) {
    next(err);
  }
});

export default indexRouter;
