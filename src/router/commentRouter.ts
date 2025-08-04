import { Router } from "express";
import CommentController from "../controller/commentController";

const commentRouter = Router();

commentRouter.get("/:postId", CommentController.getAllCommentsOfPost);
commentRouter.get("/:postId/new", CommentController.addCommentGet);
commentRouter.post("/:postId", CommentController.addComment);

export default commentRouter;
