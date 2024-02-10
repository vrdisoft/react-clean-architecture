import { Post } from "@/Domain/Models/Post";
import { useQuery } from "@tanstack/react-query";
import { PostRepositoryImpl } from "@/Data/Repositories/PostRepositoryImpl";

export const useFetchPosts = (repository: PostRepositoryImpl, page: number) => {
  const { data, isLoading } = useQuery<{ posts: Post[]; total: number }>({
    queryKey: ["posts", page],
    queryFn: () => repository.getPosts(page),
  });

  return {
    posts: data?.posts,
    total: data?.total,
    isFetchPostsLoading: isLoading,
  };
};
