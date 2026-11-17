// const express = require('express');
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
const app: Application = express();
const port = 3000;

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_fTGV9elYzPr2@ep-sweet-wildflower-a1b4sfsv.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
});
console.log(pool);

app.get("/", (req: Request, res: Response) => {
  // res.send("Hello World!");
  res.status(200).json({
    success: true,
    message: "The root route is on!",
    author: "SAYED",
  });
});

app.post("/", async (req: Request, res: Response) => {
  // console.log(req.body);

  const { name, age, password } = req.body;
  console.log(password);

  res.status(200).json({
    success: true,
    message: "Api call successfully",
    data: { name, age },
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
