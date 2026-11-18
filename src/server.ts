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
    "postgresql://neondb_owner:npg_fTGV9elYzPr2@ep-sweet-wildflower-a1b4sfsv.ap-southeast-1.aws.neon.tech/neondb?sslmode=false&channel_binding=require",
});
// console.log(pool);

const initDB = async () => {
  try {
    await pool.query(`
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY ,
      name VARCHAR(255),
      email VARCHAR(255) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      age INT,
      is_Active BOOLEAN DEFAULT true,

      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW()
    );
    `);

    console.log("Database connected!");
  } catch (error) {
    console.log(error);
  }
};

initDB();

app.get("/", (req: Request, res: Response) => {
  // res.send("Hello World!");
  res.status(200).json({
    success: true,
    message: "The root route is on!",
    author: "SAYED",
  });
});

app.post("/api/v1/users", async (req: Request, res: Response) => {
  try {
    // console.log(req.body);

    const { name, email, password, age } = req.body;
    // console.log(password);

    const result = await pool.query(
      `
    INSERT INTO users (name,email,password,age)
    VALUES ($1,$2,$3,$4)
    RETURNING * 
  `,
      [name, email, password, age],
    );

    // console.log(result);

    res.status(201).json({
      success: true,
      message: "User create successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
