import "dotenv/config";
import express from "express";
import { Request, Response, NextFunction } from "express";
import Db from "./model/init";
import signUpRouter from "./router/signupRouter";
import path from "path";
import loginRouter from "./router/loginRouter";
import passport from "passport";
import session from "express-session";
import "./auth/config";
import logoutRouter from "./router/logoutRouter";
import indexRouter from "./router/indexRouter";
import membershipRouter from "./router/membershipRouter";
import postRouter from "./router/postRouter";
import commentRouter from "./router/commentRouter";
import likeRouter from "./router/likeRouter";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "src", "view"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SECRET || "shhhh it's a secret",
    resave: false,
    saveUninitialized: false,
  }),
);
app.use(passport.session());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.currentUser = req.user;
  next();
});

app.use("/signup", signUpRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
app.use("/membership", membershipRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use("/like", likeRouter);
app.use("/", indexRouter);

app.use((_: Request, res: Response, _next: NextFunction) => {
  res.status(404).render("partial/error", {
    message: "Page not found",
    stack: "",
  });
});

app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const error = err instanceof Error ? err : new Error(String(err));
  console.error("Unhandled Error:", error);
  res.status(500).render("partial/error", {
    message: "Something went wrong.",
    stack: process.env.NODE_ENV === "production" ? "" : error.stack,
  });
});

console.log(`${process.env.NODE_ENV} MODE`);
(async () => {
  try {
    console.log(`${process.env.NODE_ENV} MODE`);
    await Db.initDb();
    app.listen(PORT, () => {
      console.log(`Server Running on PORT: ${PORT}`);
    });
  } catch (err) {
    console.error("Startup failed:", err);
    process.exit(1);
  }
})();
