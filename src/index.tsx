import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PostsPage } from "./Presentation/UI/Pages/PostsPage";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "@/Presentation/UI/themes/dark";
import "./server/mockApi";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <PostsPage />,
  },
  {
    path: "*",
    element: <div>Not Found</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={createTheme(darkTheme)}>
      <CssBaseline />
      <RouterProvider router={router} />
    </ThemeProvider>
  </QueryClientProvider>
);
