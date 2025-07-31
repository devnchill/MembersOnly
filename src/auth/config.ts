import passport from "passport";
import pool from "../db/pool";
import { Strategy as LocalStrategy } from "passport-local";
import userModel from "../model/userModel";
import bcryptjs from "bcryptjs";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const user = await userModel.findUser(email);
        console.log(user);
        console.log(user.hashedPassword);

        if (!user) {
          console.log("user not found inside new LocalStrategy");
          return done(null, false, { message: "Incorrect username" });
        }
        const match = await bcryptjs.compare(password, user.hashedPassword);
        if (!match) {
          return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = rows[0];
    console.log(user + "found in deserializeUser");

    done(null, user);
  } catch (err) {
    done(err);
  }
});
