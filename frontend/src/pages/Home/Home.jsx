import "./Home.css";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  CardActions,
  Rating,
  Stack,
  styled,
  Badge,
  IconButton,
} from "@mui/material";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useGetproductsByNameQuery } from '../../Redux/productsApi'
import LoadingProducts from "Components/Loading/LoadingProducts";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../../Redux/cartSlice'
import { Add, Remove } from "@mui/icons-material";
import { increaseQuantity, decreaseQuantity } from '../../Redux/cartSlice'

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#1976d2",
    color: "#fff",
    paddingTop: "-4px"
  },
}));

function Home() {
  const { data, isLoading } = useGetproductsByNameQuery('bulbasaur')
  const dispatch = useDispatch()

  // @ts-ignore
  const { selectedProducts, selectedProductsID } = useSelector((state) => state.counter)

  const productQuantity = (itemAPI) => {
    const myProduct = selectedProducts.find((itemUser) => {
      return itemUser.id === itemAPI.id;
    });

    return myProduct.quantity;
  }

  if (isLoading) {
    return (
      <HelmetProvider>
        <Box position="relative" sx={{ top: "10vh" }}>
          <Helmet>
            <title>سوق الكلمة - الرئيسية</title>
          </Helmet>
          <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ alignItems: "center", justifyContent: "center" }}>
            <LoadingProducts />
            <LoadingProducts />
            <LoadingProducts />
          </Stack>
        </Box>
      </HelmetProvider>
    )
  }

  if (data) {
    return (
      <HelmetProvider>
        <Box position="relative" sx={{ top: "10vh", mb: "23vh" }}>
          <Helmet>
            <title>سوق الكلمة - الرئيسية</title>
          </Helmet>

          <Box component="main">
            <Typography variant="h2" dir="rtl" sx={{ fontSize: { xl: "1.5rem", bx: "1.25rem", xs: "1rem" }, mx: "20px" }}>قسم الاجهزة الإلكترونية</Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" sx={{ alignItems: "center", justifyContent: "center" }}>
              {data.map((item) => {
                return (
                  <Card key={item.id} sx={{ maxWidth: 320, margin: { xl: "1rem 40px !important", bx: "1rem 20px !important", xs: "1rem 20px !important" } }} variant="outlined">
                    <Link to={`/product-details/${item.section}/${item.numberID}`}>
                      <CardMedia
                        component="img"
                        alt="productImage"
                        sx={{ maxWidth: "100%", maxHeight: "100%", padding: "1.2rem 3rem !important", backgroundColor: "#fff" }}
                        image={item.imageLink[0]}
                      />
                    </Link>
                    <CardContent>
                      <Link to={`/product-details/${item.section}/${item.numberID}`} style={{ textDecoration: "none !important" }}>
                        <Typography variant="body2" className="DesLinkOfPro" dir="rtl" sx={{ textAlign: "start", fontSize: { xl: "0.8rem", bx: "0.75rem", xs: "0.75rem" } }} color="text.secondary">
                          {item.description}
                        </Typography>
                      </Link>
                      <Box sx={{ textAlign: "right", mt: "6px" }}>
                        <Rating name="half-rating-read" dir="rtl" sx={{ textAlign: "right" }} defaultValue={item.starts} precision={0.5} readOnly />
                      </Box>
                      <Typography gutterBottom variant="h5" dir="auto" sx={{ textAlign: "start", fontSize: { xl: "1.5rem", bx: "1rem", xs: "1rem" } }} component="h5">
                        {item.price} {``}
                        ريال
                      </Typography>
                    </CardContent>
                    <CardActions dir="rtl" sx={{ textAlign: "start", mb: "10px", justifyContent: "flex-start", flexDirection: "row" }}>
                      {selectedProductsID.includes(item.id) ? (
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <IconButton sx={{ color: "#1976d2", ml: "10px" }} size="small" onClick={() => {
                            dispatch(increaseQuantity(item.id))
                          }}>
                            <Add fontSize="small" />
                          </IconButton>
                          <StyledBadge badgeContent={productQuantity(item)} color="secondary" />
                          <IconButton sx={{ color: "#1976d2", mr: "10px" }} size="small" onClick={() => {
                            dispatch(decreaseQuantity(item.id))
                          }}>
                            <Remove fontSize="small" />
                          </IconButton>
                        </Box>
                      ) : (
                        <Button size="small" variant="outlined" color="info" sx={{ mx: "10px", fontSize: { xl: "0.8125rem", bx: "0.72rem", xs: "0.72rem" } }} onClick={() => {
                          dispatch(addToCart(item))
                        }}>إضافة للسلة</Button>
                      )}
                      <Link to={`/product-details/${item.section}/${item.numberID}`} style={{ textDecoration: "none !important" }}>
                        <Button size="small" color="info" sx={{ fontSize: { xl: "0.8125rem", bx: "0.72rem", xs: "0.72rem" }, mx: "20px" }}>معرفة المزيد</Button>
                      </Link>
                    </CardActions>
                  </Card>
                );
              })}
            </Stack>
          </Box>
        </Box>
      </HelmetProvider>

    )
  }
}
export default Home;