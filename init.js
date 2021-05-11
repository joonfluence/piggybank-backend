import dotenv from "dotenv";
import app from "./server.js";
import "./db.js";
dotenv.config();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(
    `✅ Listening on : ${
      process.env.NODE_ENV === "development"
        ? process.env.URL
        : process.env.HEROKU_URL
    }:${PORT}`
  )
);
