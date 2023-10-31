import "./ProductDetails.css"
import { useGetOneProductQuery } from '../../Redux/productsApi'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Badge, Box, Button, Card, CardActions, CardContent, CardMedia, IconButton, Rating, Skeleton, Stack, Typography, styled } from "@mui/material";
import { addToCart, decreaseQuantity, increaseQuantity } from "Redux/cartSlice";
import { Remove, Add } from "@mui/icons-material";
import { useRef, useState } from "react";
import DetailsThumb from "../../Components/Design/DetailsThumb";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#1976d2",
    color: "#fff",
    paddingTop: "-4px"
  },
}));

function ProductDetails() {
  let { numberID } = useParams();

  const { data, isLoading } = useGetOneProductQuery(String(numberID))
  // @ts-ignore
  const { selectedProducts, selectedProductsID } = useSelector((state) => state.counter)

  const dispatch = useDispatch()

  const [index, setindex] = useState(0);
  const myRef = useRef(null);

  const handleTab = (index) => {
    setindex(index);
    const images = myRef.current.children;
    for (let i = 0; i < images.length; i++) {
      images[i].className = images[i].className.replace("active", "");
    }
    images[index].className = "active";
  };

  const getQuantity = () => {
    const quantityItem = selectedProducts.find((item) => {
      return item.id === data.id
    })

    return quantityItem.quantity
  }

  if (isLoading) {
  return (
    <HelmetProvider>
      <Box position="relative" sx={{ top: "10vh", mb: "23vh" }}>
        <Helmet>
          <title>سوق الكلمة</title>
        </Helmet>
        <Card sx={{ minWidth: "350px", margin: { xl: "1rem 40px !important", bx: "1rem 20px !important", xs: "1rem 20px !important" } }} variant="outlined">
          <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start", mb: "20px", justifyContent: "center", flexWrap: { xl: "nowrap", md: "wrap", xs: "wrap" } }}>
            <Box>
              <Skeleton variant="rectangular" animation="wave" width={320} height={258} sx={{ width: "300px", maxHeight: "100%", padding: "0.6rem 1.5rem !important", borderRadius: "15px", margin: "1.5rem !important" }} />
            </Box>
            <Box sx={{ mt: "20px !important" }}>
              <CardContent>
                <Typography variant="body2" dir="rtl" sx={{ textAlign: "start", fontSize: { xl: "1rem", bx: "0.95rem", xs: "0.95rem" } }}>
                  <Skeleton />
                </Typography>
                <Typography variant="body2" dir="rtl" sx={{ textAlign: "start", fontSize: { xl: "0.8rem", bx: "0.75rem", xs: "0.75rem" } }} color="text.secondary">
                  <Skeleton />
                </Typography>
                <Typography gutterBottom variant="h5" dir="auto" sx={{ textAlign: "start", fontSize: { xl: "1.8rem", bx: "1.5rem", xs: "1.5rem" } }} component="h5">
                  <Skeleton />
                </Typography>
              </CardContent>
              <CardActions dir="rtl" sx={{ textAlign: "start", mb: "10px" }}>
                <Button size="small" color="info" sx={{ mx: "10px", fontSize: { xl: "0.8125rem", bx: "0.72rem", xs: "0.72rem" }, cursor: "default" }}><Skeleton sx={{ width: "100%" }} /></Button>
                <Button size="small" color="info" sx={{ fontSize: { xl: "0.8125rem", bx: "0.72rem", xs: "0.72rem" }, cursor: "default" }}><Skeleton sx={{ width: "100%" }} /></Button>
              </CardActions>
            </Box>
          </Stack>
        </Card>
      </Box>
    </HelmetProvider>
  )
  }

  if (data) {
    return (
      <HelmetProvider>
        <Box position="relative" sx={{ top: "10vh", mb: "23vh" }}>
          <Helmet>
            <title>سوق الكلمة - تفصيل عن {data.productName}</title>
          </Helmet>
          <Card sx={{ minWidth: "350px", margin: { xl: "1rem 40px !important", bx: "1rem 20px !important", xs: "1rem 20px !important" } }} variant="outlined">
            <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start", mb: "20px", justifyContent: "center", flexWrap: {xl: "nowrap", md: "wrap", xs: "wrap"} }}>
              <Box>
                <CardMedia
                  component="img"
                  alt="productImage"
                  sx={{ width: "300px", maxHeight: "100%", padding: "0.6rem 1.5rem !important", borderRadius: "15px", margin: "1.5rem !important", backgroundColor: "#fff" }}
                  image={data.imageLink[index]}
                />
                <DetailsThumb
                  images={data.imageLink}
                  tab={handleTab}
                  myRef={myRef}
                />
              </Box>
              <Box sx={{mt: "20px !important"}}>
                <CardContent>
                  <Typography variant="body2" dir="rtl" sx={{ textAlign: "start", fontSize: { xl: "1rem", bx: "0.95rem", xs: "0.95rem" } }}>
                    {data.productName}
                  </Typography>
                  {data.longDescription === null && (

                    <Typography variant="body2" dir="rtl" sx={{ textAlign: "start", fontSize: { xl: "0.8rem", bx: "0.75rem", xs: "0.75rem" } }} color="text.secondary">
                      {data.description}
                    </Typography>
                  )}
                  <Typography variant="body2" dir="rtl" sx={{ textAlign: "start", fontSize: { xl: "0.8rem", bx: "0.75rem", xs: "0.75rem" } }} color="text.secondary">
                    {data.longDescription}
                  </Typography>
                  <Box sx={{ textAlign: "right", mt: "6px" }}>
                    <Rating name="half-rating-read" dir="rtl" sx={{ textAlign: "right" }} defaultValue={data.starts} precision={0.5} readOnly />
                  </Box>
                  <Typography gutterBottom variant="h5" dir="auto" sx={{ textAlign: "start", fontSize: { xl: "1.8rem", bx: "1.5rem", xs: "1.5rem" } }} component="h5">
                    {data.price} {``}
                    ريال
                  </Typography>
                  {data.details !== null && (
                    <>
                      <Typography variant="body2" dir="rtl" sx={{ mb: "-10px", textAlign: "start", fontSize: { xl: "1rem", bx: "0.95rem", xs: "0.95rem" } }}>
                        التفاصيل
                      </Typography>
                      <ul dir="rtl">
                        {data.details.map((item) => {
                          return (
                            <li key={item} dir="rtl">{item}</li>
                          )
                        })}
                      </ul>
                    </>
                  )}
                </CardContent>
                <CardActions dir="rtl" sx={{ textAlign: "start", mb: "10px", justifyContent: "flex-start", flexDirection: "row" }}>
                  {selectedProductsID.includes(data.id) ? (
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton sx={{ color: "#1976d2", ml: "10px" }} size="small" onClick={() => {
                        dispatch(increaseQuantity(data.id))
                      }}>
                        <Add fontSize="small" />
                      </IconButton>
                      <StyledBadge badgeContent={getQuantity()} color="secondary" />
                      <IconButton sx={{ color: "#1976d2", mr: "10px" }} size="small" onClick={() => {
                        dispatch(decreaseQuantity(data.id))
                      }}>
                        <Remove fontSize="small" />
                      </IconButton>
                    </Box>
                  ) : (
                    <Button size="small" variant="outlined" color="info" sx={{ mx: "10px", fontSize: { xl: "0.8125rem", bx: "0.72rem", xs: "0.72rem" } }} onClick={() => {
                      dispatch(addToCart(data))
                    }}>إضافة للسلة</Button>
                  )}
                  <Button size="small" color="info" sx={{ fontSize: { xl: "0.8125rem", bx: "0.72rem", xs: "0.72rem" }, mx: "20px" }}>معرفة المزيد</Button>
                </CardActions>
              </Box>
            </Stack>
          </Card>
        </Box>
      </HelmetProvider>
    )
  }
}

export default ProductDetails