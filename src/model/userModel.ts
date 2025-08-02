import pool from "./pool";

export type TUser = {
  readonly id: number;
  readonly createdAt: Date;
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
  isMember: boolean;
  isAdmin: boolean;
};

export type TNewUser = Omit<
  TUser,
  "id" | "created_at" | "isMember" | "isAdmin"
>;

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

  static async findUser(email: string): Promise<TUser | null> {
    const SQL = `SELECT * FROM users WHERE email=$1`;
    const { rows } = await pool.query(SQL, [email]);
    const user = rows[0];
    if (!user) {
      return null;
    }

    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      hashedPassword: user.hashed_password,
      createdAt: user.created_at,
      isAdmin: user.is_admin,
      isMember: user.is_member,
    };
  }

  static async updateMembershipStatus(id: number, isMember: boolean) {
    const SQL = `UPDATE users SET is_member = $2 WHERE id = $1`;
    await pool.query(SQL, [id, isMember]);
  }
}
