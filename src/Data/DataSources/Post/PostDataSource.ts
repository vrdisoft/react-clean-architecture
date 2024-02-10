import { Post } from "@/Domain/Models/Post";

export interface PostDataSource {
  getPosts(page: number): Promise<{ posts: Post[]; total: number }>;
  createPost(post: Omit<Post, "id">): Promise<Post>;
  updatePost(post: Omit<Post, "userId">): Promise<Post>;
  deletePost(postId: number): Promise<Post>;
}
