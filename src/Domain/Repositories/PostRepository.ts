import { Post } from "../Models/Post";

export interface PostRepository {
  getPosts(): Promise<{posts:Post[]}>;
  createPost(Post: Omit<Post, "id">): Promise<Post>;
  updatePost(Post: Omit<Post, "userID">): Promise<Post>;
}
