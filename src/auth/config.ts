import passport from "passport";
import pool from "../model/pool";
import { Strategy as LocalStrategy } from "passport-local";
import userModel from "../model/userModel";
import bcryptjs from "bcryptjs";
import type { TUser } from "../model/userModel";

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      console.log(email, "email");
      console.log(password, "password");

      try {
        const user = await userModel.findUser(email);
        if (!user) {
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
    if (!user) {
      return done(null, false);
    }
    console.log(user, "found in deserializeUser");
    delete user.hashed_password;
    done(null, user);
  } catch (err) {
    done(err);
  }
});
