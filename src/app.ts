import "dotenv/config";
import express from "express";
import { Request, Response, NextFunction } from "express";
import Db from "./db/init";
import signUpRouter from "./router/signupRouter";
import path from "path";
import loginRouter from "./router/loginRouter";
import passport from "passport";
import session from "express-session";
import "./auth/config.ts";

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

app.use("/signup", signUpRouter);
app.use("/login", loginRouter);
app.get("/logout", (req, res, next) =>
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/");
  }),
);
app.use("/", (req, res) => {
  console.log("/ endpoint hit");
  res.locals.user = req.user;
  res.render("index");
});

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
