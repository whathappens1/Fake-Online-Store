/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Appbar from "Components/Appbar";
import Sidebar from "Components/Sidebar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getDesignTokens from "../context/customTheme";

const drawerWidth = 240;

function root() {
  const [mode, setMode] = useState(
    localStorage.getItem("currentMode") === null
      ? "light"
      : localStorage.getItem("currentMode") === "light"
        ? "light"
        : "dark"
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const [Show, setShow] = useState("none");
  const [DrawerType, setDrawerType] = useState("permanent");

  // to hide drawer func
  const hideDrawer = () => {
    setDrawerType("permanent")
    setShow("none")
  }

  // to show drawer func
  const showDrawer = () => {
    setDrawerType("temporary")
    setShow("block")
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Appbar {...{ drawerWidth, showDrawer }} />

        <Sidebar {...{ drawerWidth, setMode, Show, DrawerType, hideDrawer }} />
        <Box
          component="main"
          sx={{
            marginRight: { as: `${drawerWidth}px` },
            display: "flex",
            justifyContent: "center",
            mt: "66px",
          }}
        >
          <Outlet />
        </Box>
      </div>
    </ThemeProvider>
  );
}

export default root;
