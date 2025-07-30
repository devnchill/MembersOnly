import "dotenv/config";
import express from "express";
import Db from "./db/init";
import signUpRouter from "./router/signupRouter";
import path from "path";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "..", "src", "view"));

app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: true }));

app.use("/signup", signUpRouter);

console.log(`${process.env.NODE_ENV} MODE`);
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, async () => {
    await Db.initDb();
    console.log(`Server listening on PORT: ${PORT}`);
  });
} else {
  app.listen(PORT, () => console.log(`Server Running on PORT:${PORT}`));
}
