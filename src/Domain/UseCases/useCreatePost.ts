import { Post } from "@/Domain/Models/Post";
import { PostRepositoryImpl } from "@/Data/Repositories/PostRepositoryImpl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreatePost = (repository: PostRepositoryImpl) => {
  const queryClient = useQueryClient();

  const createPost = useMutation({
    mutationFn: (post: Omit<Post, "id">) => repository.createPost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Created Posts Correctly");
    },
    onError: () => {
      toast.error("Something goes wrong");
    },
  });

  return createPost;
};
