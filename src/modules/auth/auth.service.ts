import bcrypt from "bcryptjs";
import { pool } from "../../db";
import jwt from "jsonwebtoken";

const loginUserIntoDB = async (payload: {
  email: string;
  password: string;
}) => {
  //! Check if the user exist

  const { email, password } = payload;

  const user = await pool.query(
    `
    SELECT * FROM users WHERE email=$1    
        `,
    [email],
  );
  //   console.log(user.rows[0]);
  if (user.rowCount === 0) {
    throw new Error("Invalid credentials!!");
  }

    //! Check if the password match 

  const matchPassword = await bcrypt.compare(password, user.rows[0].password);

  if (!matchPassword) {
    throw new Error("Invalid credentials!!");
  }

  //! Check the user status
  //  console.log(user.rows[0].is_Active);
  if (!user.rows[0].is_active) {
    throw new Error("Access denied!!");
  }

  //! If pass all then generate jwt token 

  const jwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
  };

  const accessToken = jwt.sign(jwtPayload, "sadfsadfasdfadf", {
    expiresIn: "1d",
  });

  return { accessToken, user: user.rows[0] };
};

export const authService = {
  loginUserIntoDB,
};