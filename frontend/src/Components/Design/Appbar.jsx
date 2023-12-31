// @ts-nocheck
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
import { Link } from "react-router-dom";

function Appbar({ drawerWidth, showDrawer }) {
  const theme = useTheme();

  return (
    <AppBar
      sx={{
        // width: { as: `calc(100% - ${drawerWidth}px)` },
        // mr: { xs: "0", as: `${drawerWidth}px` },
        zIndex: "1500",
        backgroundColor: theme.palette.custom.main,
        top: "0"
      }}
      position="fixed"
    >
      <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row-reverse", alignItems: "center" }}>
        <IconButton color="inherit" sx={{ display: { as: "none" }, mx: "0.5rem" }} onClick={() => {
          showDrawer()
        }}>
          <Menu sx={{ fontSize: "2.5rem" }} />
        </IconButton>
        <Link to="/home">
          <Box
            component={"img"}
            src="../../static/Logos/TextLogo.png"
            alt=""
            sx={{
              marginBottom: "-2px",
              marginTop: "5px",
              mx: "10px",
              width: { xl: "235px", sm: "210px", xs: "200px" },
              cursor: "pointer",
            }}
          />
        </Link>
        <Toolbar sx={{ flexGrow: "1", display: { xs: "none", sm: "block" } }}>
          <Box
            position="absolute"
            sx={{ left: "16px", top: "10px", display: "flex", alignItems: "center", flexDirection: "row-reverse" }}
          >
            <Typography color="inherit" ml={2} width="6rem" component="p">
              تميم السهلي
            </Typography>
            <Avatar alt="ProfilePic" src="../../static/images/userImg.jpg" />
          </Box>
        </Toolbar>
      </Box>
    </AppBar>
  );
}

export default Appbar;
