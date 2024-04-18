import { Box, Stack } from "@mui/material";
import React, { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <Stack
        sx={{
          minHeight: '100vh'
        }}
      >
        {children}
      </Stack>
    </Box>
  )
}

export default Layout
