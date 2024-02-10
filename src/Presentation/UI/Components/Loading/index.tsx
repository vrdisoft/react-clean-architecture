import { Typography, Box, CircularProgress } from "@mui/material";
export const Loading = () => {
  return (
    <Box sx={{ display: 'flex',justifyContent:'center',alignItems:'center',gap:2, width: '100dvh', height: '500px' }}>
      <CircularProgress size={24} color="inherit"/>
      <Typography>Loading...</Typography>
    </Box>

  )
}