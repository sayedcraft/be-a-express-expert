// const express = require('express');
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  // res.send("Hello World!");
  res.status(200).json({
    success: true,
    message: "The root route is on!",
    author: "SAYED",
    authr: "SAYED"
  });
});

app.post("/", async (req: Request, res: Response) => {
  console.log(req.body);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
