import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";
import userModel from "../model/userModel";
import bcryptjs from "bcryptjs";

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 2 and 10 characters.";

export default class SignUpController {
  static validateUser = [
    body("firstName")
      .trim()
      .isAlpha()
      .withMessage(`First name ${alphaErr}`)
      .isLength({ min: 2, max: 10 })
      .withMessage(`First name ${lengthErr}`),

    body("lastName")
      .trim()
      .isAlpha()
      .withMessage(`Last name ${alphaErr}`)
      .isLength({ min: 2, max: 10 })
      .withMessage(`Last name ${lengthErr}`),

    body("password")
      .trim()
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must be between 6 to 20 characters."),

    body("confirmPassword")
      .trim()
      .custom((confirmPassword, { req }) => {
        const { password } = req.body;
        if (password !== confirmPassword) {
          throw new Error("Passwords must match.");
        }
        return true;
      }),
  ];

  static signUpGet(_: Request, res: Response, next: NextFunction) {
    try {
      res.render("signup", {
        formData: {},
        err: [],
      });
    } catch (err) {
      next(err);
    }
  }

  static async signUpPost(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("Validation failed. Sending error page.");
      const errorMap: Record<string, string> = {};
      for (const error of errors.array()) {
        if (error.type === "field") errorMap[error.path] = error.msg;
      }
      return res.status(400).render("signup", {
        formData: req.body,
        err: errorMap,
      });
    }

    try {
      const { firstName, lastName, email, password } = req.body;
      console.log("Email from form:", email);
      const existingUser = await userModel.hasUser(email);
      console.log("Has user:", existingUser);
      if (existingUser) {
        return res.status(400).render("signup", {
          formData: req.body,
          err: { email: "Email already in use." },
        });
      }
      const hashedPassword = await bcryptjs.hash(password, 10);
      await userModel.createUser({
        firstName,
        lastName,
        email,
        hashedPassword,
      });
      res.json("Created user");
    } catch (err) {
      return next(err);
    }
  }
}
