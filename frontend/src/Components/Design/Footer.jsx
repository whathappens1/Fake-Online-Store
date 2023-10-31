import { BottomNavigation, Avatar, BottomNavigationAction, Badge, Box } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Home, ShoppingCart } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from "react-redux";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 1,
        top: 1,
        padding: '0 4px',
    },
}));

export default function SimpleBottomNavigation() {
    // @ts-ignore
    const { selectedProducts } = useSelector((state) => state.counter)
    const navigate = useNavigate();

    let location = useLocation();

    const [value, setValue] = useState(location.pathname === "/home" ? 0 : location.pathname === "/cart" ? 1 : location.pathname === "/settings" ? 2 : null);

    return (
        <Box sx={{ zIndex: "2000", maxWidth: 600, position: "fixed", bottom: "-1px", right: "0", left: "0", display: { xs: "block", sm: "none" } }}>
            <BottomNavigation
                sx={{ height: "85px !important" }}
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction label="الرئيسية" sx={{ textDecoration: "none" }} icon={<Home />} onClick={() => {
                    setValue(0);
                    navigate("/")
                }} />
                <BottomNavigationAction label="السلة" icon={<StyledBadge badgeContent={selectedProducts.length} color="info" onClick={() => {
                    setValue(1);
                    navigate("/cart")

                }}
                >
                    <ShoppingCart />
                </StyledBadge>} />
                <BottomNavigationAction label="الحساب" icon={<Avatar alt="ProfilePic" sx={{ width: 32, height: 32, mb: "5px" }}
                    src="../../static/images/userImg.jpg" />} onClick={() => {
                        setValue(2);
                        navigate("/settings")

                    }}
                />
            </BottomNavigation>
        </Box>
    );
}