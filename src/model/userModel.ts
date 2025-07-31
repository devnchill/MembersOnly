import pool from "../db/pool";

export type TUser = {
  readonly id: number;
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
  readonly created_at: Date;
};

export type TNewUser = Omit<TUser, "id" | "created_at">;

export default class userModel {
  static async createUser(user: TNewUser) {
    const SQL = `INSERT INTO users (first_name,last_name,email,hashed_password) VALUES($1,$2,$3,$4) RETURNING id`;
    const { rows } = await pool.query(SQL, [
      user.firstName,
      user.lastName,
      user.email,
      user.hashedPassword,
    ]);
    return rows[0];
  }

  static async hasUser(email: string): Promise<boolean> {
    const SQL = `SELECT email FROM users WHERE email=$1`;
    const { rowCount } = await pool.query(SQL, [email]);
    return rowCount! > 0;
  }

  static async findUser(email: string): Promise<TUser> {
    const SQL = `SELECT * FROM users WHERE email=$1`;
    const { rows } = await pool.query(SQL, [email]);
    const user = rows[0];
    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      hashedPassword: user.hashed_password,
      created_at: user.created_at,
    };
  }
}
