/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Appbar from "Components/Design/Appbar";
import Sidebar from "Components/Design/Sidebar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import getDesignTokens from "../context/customTheme";
import Footer from "Components/Design/Footer";

const drawerWidth = 240;

function root() {
  const [mode, setMode] = useState(
    localStorage.getItem("currentMode") === null
      ? "dark"
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
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default root;
