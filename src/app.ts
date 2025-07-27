import "dotenv/config";
import express from "express";
import Db from "./db/init";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

console.log(`${process.env.NODE_ENV} MODE`);

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, async () => {
    await Db.initDb();
    console.log(`Server listening on PORT: ${PORT}`);
  });
} else {
  app.listen(PORT, () => console.log(`Server Running on PORT:${PORT}`));
}
