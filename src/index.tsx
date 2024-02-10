import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CssBaseline } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { darkTheme } from "@/Presentation/UI/themes/dark";
import "./server/mockApi";
import { Toaster } from "react-hot-toast";
import { router } from "./Core/routeConfig/router";

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={createTheme(darkTheme)}>
      <CssBaseline />
      <Toaster />
      <RouterProvider router={router} />
    </ThemeProvider>
  </QueryClientProvider>
);
