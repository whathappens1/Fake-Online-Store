import { Drawer, Divider, useTheme, Box, Badge, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";
import {
  DarkMode,
  Home,
  LightMode,
  Logout,
  Person2,
  Settings,
  ShoppingCart
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import Fab from "@mui/material/Fab";
import { styled } from '@mui/material/styles';
import { useSelector } from "react-redux";

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    padding: '0 4px',
  },
}));

function Sidebar({ drawerWidth, setMode, Show, DrawerType, hideDrawer }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const currentLocation = useLocation();
  // @ts-ignore
  const { selectedProducts } = useSelector((state) => state.counter)

  const myList = [
    { text: "الرئيسية", icon: <Home />, path: "/home" },
    {
      text: "سلة التسوق", icon: <StyledBadge badgeContent={selectedProducts.length} color="info">
        <ShoppingCart />
      </StyledBadge>, path: "/cart"
    },
    { text: "الحساب", icon: <Person2 />, path: "/profile" },
    { text: "الإعدادات", icon: <Settings />, path: "/settings" },
  ];

  return (
    <Box component="nav">
      <Drawer
        sx={{
          display: { xs: Show, as: "block" },
          width: `${drawerWidth}px`,

          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: `${drawerWidth}px`,
            boxSizing: "border-box",
            mt: "3.5rem !important",
          },
        }}
        variant={DrawerType}
        anchor="right"
        open={true}
        onClose={() => {
          hideDrawer();
        }}
      >
        <Divider />
        <List>
          {myList.map((item) => {
            return (
              <ListItem
                key={item.text}
                disablePadding
                sx={{

                  bgcolor:
                    currentLocation.pathname.toLowerCase() === item.path
                      ? // @ts-ignore
                      theme.palette.custom.light
                      : null
                }}
                onClick={() => {
                  navigate(item.path);
                  hideDrawer();
                }}
              >
                <ListItemButton sx={{ flexDirection: "row-reverse", textAlign: "right !important" }} >
                  <ListItemIcon
                    sx={{
                      minWidth: "unset !important",
                      mx: "0.5rem",
                      color:
                        currentLocation.pathname.toLowerCase() === item.path
                          ? // @ts-ignore
                          theme.palette.custom.main
                          : null
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    className="sidebarText"
                    sx={{
                      mx: "1.25rem",
                      color:
                        currentLocation.pathname.toLowerCase() === item.path
                          ? // @ts-ignore
                          theme.palette.custom.main
                          : null
                    }}
                    primary={item.text}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: "right !important" }}>
              <ListItemText className="sidebarText" primary="تسجيل خروج" sx={{ mx: "1.25rem" }} />
              <ListItemIcon sx={{ minWidth: "unset !important", mx: "0.5rem" }}>
                <Logout />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>

          <Fab
            className="ChangeModeButton"
            variant="extended"
            sx={{
              color: "black",
              boxShadow: "0",
              backgroundColor: "#f5f5f5",
              mt: "25px",
              ml: "70px",
            }}
            onClick={() => {
              localStorage.setItem(
                "currentMode",
                theme.palette.mode === "dark" ? "light" : "dark"
              );
              setMode(theme.palette.mode === "dark" ? "light" : "dark");
            }}
          >
            {theme.palette.mode === "light" ? (
              <LightMode sx={{ m: 1, color: "orange" }} />
            ) : (
              <DarkMode sx={{ m: 1, color: "black" }} />
            )}
            تغيير الوضع
          </Fab>
        </List>
      </Drawer>
    </Box>
  );
}

export default Sidebar;
