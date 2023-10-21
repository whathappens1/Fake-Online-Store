import React from "react";
import { useTheme, Typography, Box } from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";

function NotFound() {
  const theme = useTheme();

  return (
    <HelmetProvider>
      <Helmet>
        <title>Money Flow - Not Found</title>
      </Helmet>
      <Box mt={16}>
        <Typography variant="h5" color={theme.palette.error.main}>
          Sorry, There is no Desgin yet..
        </Typography>
        <br />
        <Typography
          variant="h4"
          color={
            // @ts-ignore
            theme.palette.custom.contraxtText
          }
          textAlign="center"
        >
          Try Again Later
        </Typography>
      </Box>
    </HelmetProvider>
  );
}

export default NotFound;
