import { Router } from "express";

const indexRouter = Router();

indexRouter.get("/", (req, res, next) => {
  res.locals.user = req.user;
  res.render("index");
});

export default indexRouter;
