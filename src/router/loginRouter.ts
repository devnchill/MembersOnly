import { Router } from "express";
import passport from "passport";

const loginRouter = Router();

loginRouter.get("/", (_, res, next) => {
  try {
    res.render("login");
  } catch (err) {
    return next(err);
  }
});

loginRouter.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "/failure",
    successRedirect: "/success",
  }),
);

export default loginRouter;
