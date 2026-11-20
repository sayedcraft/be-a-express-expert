// const express = require('express');
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { pool } from "./db";
import { userRouter } from "./modules/users/user.route";
const app: Application = express();
// const port = 3000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  // res.send("Hello World!");
  res.status(200).json({
    success: true,
    message: "The root route is on!",
    author: "SAYED",
    dkfj: "SAYED",
  });
});

app.use("/api/v1/users", userRouter);



export default app;
