import pool from "./pool";

export default class Db {
  static async createUserTable() {
    await pool.query(`CREATE TABLE IF NOT EXISTS users
    (
      id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY ,
      first_name VARCHAR(255),
      last_name VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      hashed_password VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `);
  }

  static async createPostTable() {
    await pool.query(`CREATE TABLE IF NOT EXISTS posts 
    (
      id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      title VARCHAR(255),
      content text,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      user_id BIGINT REFERENCES users(id) ON DELETE CASCADE
    )
    `);
  }

  static async createCommentTable() {
    await pool.query(`CREATE TABLE IF NOT EXISTS comments 
    (
      id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      comment TEXT,
      user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
      post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `);
  }

  static async createLikeTable() {
    await pool.query(`CREATE TABLE IF NOT EXISTS likes
    (
      id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
      post_id BIGINT REFERENCES posts(id) ON DELETE CASCADE,
      UNIQUE(user_id,post_id)
    )
    `);
  }

  static async initDb() {
    const result = await pool.query("SELECT current_database()");
    console.log("Connected to DB:", result.rows[0].current_database);
    await this.createUserTable();
    await this.createPostTable();
    await this.createCommentTable();
    await this.createLikeTable();
  }
}
