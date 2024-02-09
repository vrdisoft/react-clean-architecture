import { PostDataSource } from "@/Data/DataSources/Post/PostDataSource";
import { Post } from "@/Domain/Models/Post";
import { PostRepository } from "@/Domain/Repositories/PostRepository";

export class PostRepositoryImpl implements PostRepository {
  datasource: PostDataSource;

  constructor(datasource: PostDataSource) {
    this.datasource = datasource;
  }

  async getPosts(): Promise<{ posts: Post[] }> {
    return await this.datasource.getPosts();
  }

  async createPost(post: Omit<Post, "id">): Promise<Post> {
    return await this.datasource.createPost(post);
  }

  async updatePost(post: Omit<Post, "userID">): Promise<Post> {
    return await this.datasource.updatePost(post);
  }
}
