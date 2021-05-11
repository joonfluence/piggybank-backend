import bodyParser from "body-parser";
import express from "express";
import morgan from "morgan";
import cors from "cors";
import apiRouter from "./routers/apiRouter.js";
import cookieParser from "cookie-parser";
import routes from "./routes.js";

const app = express();

app.use(morgan("dev"));
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(routes.api, apiRouter);

export default app;
