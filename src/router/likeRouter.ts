import { Router } from "express";
import LikeController from "../controller/likeController";

const likeRouter = Router();

likeRouter.post("/:postId", LikeController.likePost);

export default likeRouter;
