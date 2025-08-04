import pool from "./pool";

type TPost = {
  readonly id: number;
  createdAt: Date;
  readonly userId: number;
  title: string;
  content: string;
};

type TNewPost = Omit<TPost, "id" | "createdAt">;

type TPostWithAuthor = TPost & {
  firstName: string;
};

export default class PostModel {
  static async createPost(post: TNewPost): Promise<TPost> {
    const SQL = `
    INSERT INTO posts (title, content, user_id)
    VALUES ($1, $2, $3)
    RETURNING id, title, content, user_id, created_at
  `;
    const { rows } = await pool.query(SQL, [
      post.title,
      post.content,
      post.userId,
    ]);

    const inserted = rows[0];

    return {
      id: inserted.id,
      title: inserted.title,
      content: inserted.content,
      userId: inserted.user_id,
      createdAt: inserted.created_at,
    };
  }

  static async findPost(id: number): Promise<TPost | null> {
    const SQL = `SELECT * FROM posts WHERE id=$1`;
    const { rows } = await pool.query(SQL, [id]);
    const post = rows[0];
    if (!post) return null;
    return {
      id: post.id,
      userId: post.user_id,
      title: post.title,
      content: post.content,
      createdAt: post.created_at,
    };
  }

  static async getAllPosts(): Promise<TPostWithAuthor[]> {
    const { rows } = await pool.query(`
      SELECT 
        posts.id,
        posts.created_at  AS "createdAt",
        posts.user_id AS "userId",
        users.first_name AS "firstName",
        posts.title, 
        posts.content 
      FROM posts
      JOIN users ON posts.user_id = users.id
  `);
    return rows;
  }

  static async deletePost(id: number) {
    const SQL = `DELETE FROM posts WHERE id = $1`;
    const result = await pool.query(SQL, [id]);
    return result.rowCount;
  }
}
