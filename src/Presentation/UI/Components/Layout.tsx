import { ReactNode } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <Container
      sx={{
        marginTop: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "300px",
        ["@media (min-width: 900px)"]: {
          maxWidth: "900px",
        },
      }}
    >
      <Box
        sx={{
          width: "100%",
          marginTop: "32px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>{children}</Box>
      </Box>
    </Container>
  );
}

