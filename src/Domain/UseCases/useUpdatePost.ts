import { Post } from "@/Domain/Models/Post";
import { PostRepositoryImpl } from "@/Data/Repositories/PostRepositoryImpl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdatePost = (repository: PostRepositoryImpl) => {
  const queryClient = useQueryClient();

  const updatePost = useMutation({
    mutationFn: (post: Omit<Post, "userId">) => repository.updatePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Update Posts Correctly");
    },
    onError: () => {
      toast.error("Something goes wrong");
    },
  });

  return updatePost;
};
