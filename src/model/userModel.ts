import pool from "../db/pool";

type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
};

export default class userModel {
  static async createUser(user: TUser) {
    const SQL = `INSERT INTO users (first_name,last_name,email,hashed_password) VALUES($1,$2,$3,$4)`;
    await pool.query(SQL, [
      user.firstName,
      user.lastName,
      user.email,
      user.hashedPassword,
    ]);
  }

  static async hasUser(email: string): Promise<boolean> {
    const SQL = `SELECT email FROM users WHERE email=$1`;
    const { rowCount } = await pool.query(SQL, [email]);
    return rowCount! > 0;
  }
}
