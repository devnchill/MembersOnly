import pool from "./pool";

export default class Db {
  static async createUserTable() {
    await pool.query(`CREATE TABLE IF NOT EXISTS users 
    (
      uid BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY ,
      firstname VARCHAR(255),
      lastname VARCHAR(255),
      email VARCHAR(255) UNIQUE,
      hashedpassword VARCHAR(255)
    )
    `);
  }

  static async createPostTable() {
    await pool.query(`CREATE TABLE IF NOT EXISTS posts 
    (
      pid BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      title VARCHAR(255),
      content VARCHAR(255),
      time TIMESTAMP,
      uid BIGINT REFERENCES users(uid) ON DELETE CASCADE
    )
    `);
  }

  static async createCommentTable() {
    await pool.query(`CREATE TABLE IF NOT EXISTS comments 
    (
      cid BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      comment VARCHAR(255),
      uid BIGINT REFERENCES users(uid) ON DELETE CASCADE,
      pid BIGINT REFERENCES posts(pid) ON DELETE CASCADE,
      date TIMESTAMP 
    )
    `);
  }

  static async createLikesTable() {
    await pool.query(`CREATE TABLE IF NOT EXISTS likes 
    (
      lid BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      uid BIGINT REFERENCES users(uid) ON DELETE CASCADE,
      pid BIGINT REFERENCES posts(pid) ON DELETE CASCADE,
      UNIQUE(uid,pid)
    )
    `);
  }

  static async initDb() {
    const result = await pool.query("SELECT current_database()");
    console.log("Connected to DB:", result.rows[0].current_database);
    await this.createUserTable();
    await this.createPostTable();
    await this.createCommentTable();
    await this.createLikesTable();
  }
}
