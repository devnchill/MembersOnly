import { Router } from "express";
import passport from "passport";
import loginController from "../controller/loginController";

const loginRouter = Router();

loginRouter.get("/", loginController.loginGet);

loginRouter.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/login",
    successRedirect: "/",
    failureMessage: "invalid username or password",
  }),
);

export default loginRouter;
