// @ts-nocheck
import React from "react";
import "./Cart.css";
import {
  Box,
  InputAdornment,
  TextField,
  Button,
  styled,
  useTheme,
} from "@mui/material";
import { Add, ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useForm } from "react-hook-form";

function Cart() {
  const navigate = useNavigate();

  const theme = useTheme();

  const CustomButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(theme.palette.custom.main),
    backgroundColor: theme.palette.custom.main,
    height: "43px",
    "&:hover": {
      backgroundColor: theme.palette.custom.dark,
    },
  }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = ({ price, title }) => {
    price = Number(price);

    fetch("http://localhost:3100/myList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price, title }),
    }).then(() => {
      navigate("/");
    });
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Money Flow - Create</title>
        <meta name="description" content="Money Flow - Create" />
      </Helmet>
      <Box
        component="form"
        sx={{ width: "380px" }}
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="Transaction Title"
          fullWidth
          variant="filled"
          {...register("title", {
            required: { value: true, message: "Required field" },
            minLength: { value: 3, message: "Minimum length 3 characters" },
          })}
          error={Boolean(errors.title)}
          helperText={
            Boolean(errors.title) ? errors.title?.message.toString() : null
          }
          color={theme.palette.mode === "light" ? "primary" : "info"}
          sx={{ mt: "22px", display: "block" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <ArrowForward sx={{ opacity: "0.75", fontSize: "18px" }} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          label="Transaction Price"
          fullWidth
          variant="filled"
          type="number"
          {...register("price", {
            required: { value: true, message: "Required field" },
          })}
          error={Boolean(errors.price)}
          helperText={
            Boolean(errors.price) ? errors.price?.message.toString() : null
          }
          color={theme.palette.mode === "light" ? "primary" : "info"}
          sx={{ mt: "22px", display: "block" }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <CustomButton
          variant="contained"
          type="submit"
          sx={{
            mt: "22px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
          fullWidth
        >
          Add to Home <Add sx={{ fontSize: "21px", ml: "4px", mb: "3.5px" }} />
        </CustomButton>
      </Box>
    </HelmetProvider>
  );
}

export default Cart;
