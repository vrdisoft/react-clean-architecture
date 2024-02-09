import { Post } from "@/Domain/Models/Post";
import { useQuery } from "@tanstack/react-query";
import { PostRepositoryImpl } from "@/Data/Repositories/PostRepositoryImpl";

export const useFetchPosts = (repository: PostRepositoryImpl) => {
  const { data, isLoading } = useQuery<{ posts: Post[] }>({
    queryKey: ["posts"],
    queryFn: () => repository.getPosts(),
  });

  return {
    posts: data?.posts,
    isFetchPostsLoading: isLoading,
  };
};
