// const express = require('express');
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { pool } from "./db";
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

app.get("/api/v1/users", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM users  
    `);

    // console.log(result);
    res.status(200).json({
      success: true,
      message: "User retrived successfully!",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
});

app.get("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT * FROM users
      WHERE id = $1  
    `,
      [id],
    );

    // console.log(result);
    if (result.rowCount == 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrived successfully!",
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

app.put("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, password, age, is_active } = req.body;

    const result = await pool.query(
      `
      UPDATE users SET
      name = COALESCE($1, name),  
      password = COALESCE($2, password),  
      age = COALESCE($3, age),  
      is_active = COALESCE($4, is_active),
      updated_at = NOW()
      WHERE id =$5 
      RETURNING *
     `,
      [name ?? null, password ?? null, age ?? null, is_active ?? null, id],
    );

    // console.log(result);
    if (result.rowCount == 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
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

app.delete("/api/v1/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM users 
      WHERE id = $1  
    `,
      [id],
    );
    // console.log(result);

    if (result.rowCount == 0) {
      res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      // data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error?.message,
      error: error,
    });
  }
});

export default app;
