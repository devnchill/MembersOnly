import { Router } from "express";
import PostController from "../controller/postController";
import ensureLoggedIn from "../middleware/ensureLoggedIn";

const postRouter = Router();

postRouter.get("/new", ensureLoggedIn, PostController.createPostGet);
postRouter.post("/new", ensureLoggedIn, PostController.createPostPost);

export default postRouter;
