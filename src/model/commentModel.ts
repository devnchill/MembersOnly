import pool from "./pool";

type TComment = {
  id: number;
  createdAt: Date;
  comment: string;
  userId: number;
  postId: number;
};

type TNewComment = Omit<TComment, "id" | "createdAt">;

type TCommentWithUser = TComment & { firstName: string };

export default class commentModel {
  static async getAllCommentsOfPost(
    postId: number,
  ): Promise<TCommentWithUser[]> {
    const SQL = `
    SELECT 
      comments.id,
      comments.created_at AS "createdAt",
      comments.comment,
      comments.user_id AS "userId",
      comments.post_id AS "postId",
      users.first_name AS "firstName"
    FROM comments 
    INNER JOIN users ON comments.user_id = users.id 
    WHERE post_id = $1
  `;
    const { rows } = await pool.query(SQL, [postId]);
    return rows;
  }

  static async addComment(c: TNewComment) {
    const SQL = `INSERT INTO comments (comment,user_id,post_id) VALUES($1,$2,$3)`;
    await pool.query(SQL, [c.comment, c.userId, c.postId]);
  }
}
