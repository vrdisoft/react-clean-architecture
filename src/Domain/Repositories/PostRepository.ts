import { Post } from "../Models/Post";

export interface PostRepository {
  getPosts(page: number): Promise<{ posts: Post[]; total: number }>;
  createPost(Post: Omit<Post, "id">): Promise<Post>;
  updatePost(Post: Omit<Post, "userID">): Promise<Post>;
  deletePost(postId: number): Promise<Post>;
}
