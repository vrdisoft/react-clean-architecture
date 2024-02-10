import { PostDataSource } from "@/Data/DataSources/Post/PostDataSource";
import { Post } from "@/Domain/Models/Post";
import { PostRepository } from "@/Domain/Repositories/PostRepository";

export class PostRepositoryImpl implements PostRepository {
  datasource: PostDataSource;

  constructor(datasource: PostDataSource) {
    this.datasource = datasource;
  }

  async getPosts(page: number): Promise<{ posts: Post[]; total: number }> {
    return await this.datasource.getPosts(page);
  }

  async createPost(post: Omit<Post, "id">): Promise<Post> {
    return await this.datasource.createPost(post);
  }

  async updatePost(post: Omit<Post, "userId">): Promise<Post> {
    return await this.datasource.updatePost(post);
  }

  async deletePost(postId: number): Promise<Post> {
    return await this.datasource.deletePost(postId);
  }
}
