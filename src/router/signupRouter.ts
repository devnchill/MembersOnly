import { Router } from "express";
import SignUpController from "../controller/signUpController";

const signUpRouter = Router();

signUpRouter.get("/", SignUpController.signUpGet);
signUpRouter.post(
  "/",
  SignUpController.validateUser,
  SignUpController.signUpPost,
);

export default signUpRouter;
