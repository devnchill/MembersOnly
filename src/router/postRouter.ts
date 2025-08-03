import { Router } from "express";
import PostController from "../controller/postController";
import ensureLoggedIn from "../middleware/ensureLoggedIn";

const postRouter = Router();

postRouter.get("/new", ensureLoggedIn, PostController.createPostGet);
postRouter.post("/", ensureLoggedIn, PostController.createPostPost);
postRouter.delete("/:id", ensureLoggedIn, PostController.deletePost);

export default postRouter;
