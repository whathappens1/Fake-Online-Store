// @ts-nocheck
import React from "react";
import {
  Avatar,
  Typography,
  Toolbar,
  AppBar,
  Box,
  useTheme,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Menu } from '@mui/icons-material';

function Appbar({ drawerWidth, showDrawer }) {
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        width: { as: `calc(100% - ${drawerWidth}px)` },
        mr: { xs: "0", as: `${drawerWidth}px` },
        backgroundColor: theme.palette.custom.main,
      }}
      position="relative"
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row-reverse", alignItems: "center" }}>
        <IconButton color="inherit" sx={{ display: { as: "none" }, mx: "0.5rem" }} onClick={() => {
          showDrawer()
        }}>
          <Menu sx={{fontSize: "2rem"}} />
        </IconButton>
        <Toolbar sx={{flexGrow: "1"}}>
          <Box
            position="absolute"
            sx={{ left: "16px", display: "flex", alignItems: "center", flexDirection: "row-reverse" }}
          >
            <Typography color="inherit" ml={2} width="6rem" component="p">
              تميم السهلي
            </Typography>
            <Avatar alt="Error" src="./static/images/userImg.jpg" />
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default Appbar;
