import { PostDataSource } from "./PostDataSource";
import { Post } from "@/Domain/Models/Post";
import { customApi } from "@/Core/api/customApi";

export class PostDataSourceImpl implements PostDataSource {
  async getPosts(page: number) {
    const res = await customApi.get<{ posts: Post[]; total: number }>(
      "/posts",
      { params: { page } }
    );
    return res.data;
  }

  async createPost(post: Omit<Post, "id">) {
    const res = await customApi.post<Post>("/posts", post);
    return res.data;
  }

  async updatePost(post: Omit<Post, "userId">) {
    const res = await customApi.put<Post>(`/posts/${post.id}`, post);
    return res.data;
  }

  async deletePost(postId: number) {
    const res = await customApi.delete<Post>(`/posts/${postId}`);
    return res.data;
  }
}
