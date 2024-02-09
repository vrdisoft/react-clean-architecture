import { Post } from "@/Domain/Models/Post";

export interface PostDataSource {
  getPosts(): Promise<{posts:Post[]}>;
  createPost(post: Omit<Post, "id">): Promise<Post>;
  updatePost(post: Omit<Post, "userID">): Promise<Post>;
}
