import { PostsPage } from "@/Presentation/UI/Pages/PostsPage";
import * as paths from "./paths"
import { createBrowserRouter } from "react-router-dom"

export const router = createBrowserRouter([
  {
    path: paths.HOME,
    element: <PostsPage />,
  },
  {
    path: paths.Posts,
    element: <PostsPage />,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);