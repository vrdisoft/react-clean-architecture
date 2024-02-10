import { Post } from "@/Domain/Models/Post";
import { PostRepositoryImpl } from "@/Data/Repositories/PostRepositoryImpl";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeletePost = (repository: PostRepositoryImpl) => {
  const queryClient = useQueryClient();

  const deletePost = useMutation({
    mutationFn: (post: Omit<Post, "userId">) => repository.deletePost(post.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      toast.success("Delete Posts Correctly");
    },
    onError: () => {
      toast.error("Something goes wrong");
    },
  });

  return deletePost;
};
