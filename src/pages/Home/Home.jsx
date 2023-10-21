import React, { useEffect, useState } from "react";
import "./Home.css";
import {
  Box,
  Paper,
  Typography,
  IconButton,
  useTheme,
  Alert
} from "@mui/material";
import { ArrowForward, Close } from "@mui/icons-material";
import { Helmet, HelmetProvider } from "react-helmet-async";

function Home() {
  const theme = useTheme();
  const [myList, setMyList] = useState([]);
  
  const [deleteAlert, setDeleteAlert] = useState("0");
  const [funnyModeIsOff] = useState(
    localStorage.getItem("funnyModeIsOff")
  );

  useEffect(() => {
    fetch("http://localhost:3100/myList")
      .then((response) => response.json())
      .then((data) => setMyList(data));
  }, []);

  // to delete any paper func
  const handleDelete = (item) => {
    setDeleteAlert("1");
    fetch(`http://localhost:3100/myList/${item.id}`, {
      method: "DELETE",
    });

    const newArr = myList.filter((myObject) => {
      return myObject.id !== item.id;
    });

    setMyList(newArr);
    setTimeout(() => {
      setDeleteAlert("0");
    }, 1500);
  };

  let totalPrice = 0;
  return (
    <HelmetProvider>
      <Box position="relative">
        <Helmet>
          <title>Money Flow - Home</title>
          <meta name="description" content="Money Flow - Home" />
        </Helmet>
        {funnyModeIsOff === "false" && (
          <img
            src="./static/images/goodEmoji.png"
            alt=""
            className={deleteAlert === "1" ? "trueImg" : "GoodImg"}
            style={{
              transition: "all 1s",
              position: "absolute",
              left: "-35px",
              zIndex: "55",
            }}
          />
        )}
        {myList.length > 0 ? null : (
          <Typography variant="h3" color={theme.palette.error.main} sx={{textAlign: "center", fontSize: {xs: "20px", sm: "25px", md: "30px"}}}>There is no any billing</Typography>
        )}
        {myList.map((item) => {
          totalPrice += item.price;
          return (
            <Paper
              key={item.id}
              sx={{
                width: "366px",
                display: "flex",
                justifyContent: "space-between",
                position: "relative",
                mt: "32px",
                pt: "27px",
                pb: "7px",
                // @ts-ignore
                borderBottom: `4px solid ${theme.palette.custom.main}`,
              }}
            >
              <Typography variant="h6" sx={{ fontSize: "1.3em", ml: "16px" }}>
                {item.title}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.4em",
                  mr: "33px",
                  fontWeight: "500",
                  opacity: "0.8",
                }}
              >
                ${item.price}
              </Typography>

              <IconButton
                onClick={() => {
                  handleDelete(item);
                }}
                sx={{ position: "absolute", top: "0", right: "0" }}
              >
                <Close sx={{ fontSize: "20px" }}></Close>
              </IconButton>
            </Paper>
          );
        })}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <ArrowForward sx={{ fontSize: "30px", marginRight: "5px" }} />
          <Typography variant="h6">Your Spend Amount ${totalPrice}</Typography>
        </Box>
        <Alert
          sx={{ opacity: deleteAlert, transition: "all 0.4s", mt: "90px" }}
          className="AlertDelete"
          color="info"
          onClose={() => {
            setDeleteAlert("0");
          }}
        >
          You have successfully deleted it
        </Alert>
      </Box>
    </HelmetProvider>
  );
}

export default Home;
