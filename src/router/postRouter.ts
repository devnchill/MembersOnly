import { Router } from "express";
import PostController from "../controller/postController";

const postRouter = Router();

postRouter.get("/new", PostController.createPostGet);
postRouter.post("/new", PostController.createPostPost);

export default postRouter;
