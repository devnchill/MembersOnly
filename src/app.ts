import "dotenv/config";
import express from "express";
import { Request, Response, NextFunction } from "express";
import Db from "./model/init";
import signUpRouter from "./router/signupRouter";
import path from "path";
import loginRouter from "./router/loginRouter";
import passport from "passport";
import session from "express-session";
import "./auth/config.ts";
import logoutRouter from "./router/logoutRouter";
import indexRouter from "./router/indexRouter";
import membershipRouter from "./router/membershipRouter";
import postRouter from "./router/postRouter";

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
app.use("/post", postRouter);
app.use("/", indexRouter);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled Error:", err);
  res.status(500).render("error", {
    message: "Something went wrong.",
    stack: "",
  });
});

console.log(`${process.env.NODE_ENV} MODE`);
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, async () => {
    await Db.initDb();
    console.log(`Server listening on PORT: ${PORT}`);
  });
} else {
  app.listen(PORT, () => console.log(`Server Running on PORT:${PORT}`));
}
