import "./Cart.css";
import {
  Box,
  Paper,
  Typography,
  useTheme,
  Button,
  Stack,
  Divider,
  TextField,
  IconButton,
  Badge,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Add, Delete, Remove } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux'
import { deleteFromCart, increaseQuantity, decreaseQuantity } from '../../Redux/cartSlice'

const SummaryPaper = styled(Paper)(({ theme }) => ({
  height: 400,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'right',
}));

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '8px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  color: "#fff",
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  }
});

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#1976d2",
    color: "#fff",
  },
}));

function Cart() {
  const theme = useTheme();

  // @ts-ignore
  const { selectedProducts } = useSelector((state) => state.counter)


  const cartTotal = () => {
    let total = 0
    selectedProducts.forEach(item => {
      total = total + Number(item.price) * Number(item.quantity)
    })

    return total.toFixed(2)
  }

  const cartTotalWithTaxs = () => {
    let total = 0
    selectedProducts.forEach(item => {
      total = total + Number(item.price) * Number(item.quantity) + 12
    })

    return total.toFixed(2)
  }
  const dispatch = useDispatch()

  return (
    <HelmetProvider>
      <Helmet>
        <title>سوق الكلمة - سلة التسوق</title>
      </Helmet>
      <Box component="main" sx={{ my: "10vh" }}>
        <Stack
          direction="row"
          spacing={10}
          flexWrap="wrap"
          sx={{ alignItems: "center", justifyContent: "center" }}
        >
          <Box className="summaryOfOrder" component="summary" sx={{ width: { xl: "500px", md: "400px", bx: "360px", xs: "300px" }, display: selectedProducts.length === 0 ? "none" : "block" }}>
            <SummaryPaper variant="outlined">
              <Box sx={{ mt: "30px" }}>
                <Typography variant="h4" sx={{ mr: "10px" }}>ملخص الطلب</Typography>
                <br />
                <Box sx={{ width: "95%", margin: "0 auto !important" }}>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button disabled={selectedProducts.length === 0} className='ApplyCodeBtn blueBtn'>تطبيق</Button>
                    <TextField
                      fullWidth
                      color="info"
                      size="small"
                      sx={{ textAlign: "center", borderRadius: "0 !important", direction: "rtl !important" }}
                      hiddenLabel
                      id="filled-hidden-label-normal"
                      placeholder='هل لديك كود خصم؟'
                      variant="filled"
                    />
                  </Box>
                  <Box sx={{ mt: "20px" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row-reverse", my: "5px" }}>
                      <Typography variant="body2">المجموع الفرعي ({selectedProducts.length === 0 ? "لن يوجد" : `منتج ${selectedProducts.length}`})</Typography>
                      <Typography variant="body2" dir="rtl" sx={{ textAlign: "start" }}>{selectedProducts.length === 0 ? "0" : cartTotal()} {''}
                        ريال</Typography>
                    </Box>
                    <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row-reverse", my: "5px" }}>
                      <Typography variant="body2">الشحن</Typography>
                      <Typography variant="body2" dir="rtl" sx={{ textAlign: "start" }}>12 ريال</Typography>
                      {/* <Typography variant="body2" className='freeDelivery' dir="auto" sx={{ textAlign: "start" }}>مجاناً</Typography> */}
                    </Box>
                    <Divider sx={{ my: "10px" }} />
                    <Box sx={{ mt: "20px" }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", flexDirection: "row-reverse", my: "5px" }}>
                        <Typography variant="h5">المجموع</Typography>
                        <Typography variant="h5" dir="rtl" sx={{ textAlign: "start" }}>{selectedProducts.length === 0 ? "0" : cartTotalWithTaxs()} {''}
                          ريال</Typography>
                      </Box>
                      <br />
                      <BootstrapButton className='blueBtn' disabled={selectedProducts.length === 0} fullWidth disableRipple>
                        التالي
                      </BootstrapButton>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </SummaryPaper>
          </Box>

          <Box component="section" className='ordersPapers'>
            {selectedProducts.length === 0 && (
              <Box sx={{ mt: "1rem" }}>
                <Typography variant="h4" sx={{ mr: "10px", fontSize: { xl: "2.125rem", bx: "1.75rem", xs: "1.50rem" } }}>ماحطيت اي منتج للحين؟</Typography>
                <br />
                <Link to={'/'}>
                  <BootstrapButton variant="contained" disabled={selectedProducts.length !== 0} fullWidth>تسوق الحين</BootstrapButton>
                </Link>
              </Box>
            )}


            {selectedProducts.map((item) => {
              return (
                <Paper
                  key={item.id}
                  sx={{
                    maxWidth: "600px",
                    position: "relative",
                    my: "32px",
                    padding: "0 10px"
                  }}
                >
                  <Box sx={{ display: "flex", flexDirection: "row-reverse", justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
                      <Link to="/cart">
                        <Box
                          component="img"
                          alt="productImage"
                          sx={{ width: { xl: "120px", md: "100px", bx: "90px", xs: "85px" }, maxHeight: "auto", padding: "0.5rem 1.2rem !important", backgroundColor: "#fff", borderBottomLeftRadius: "10px", borderTopLeftRadius: "10px" }}
                          src={item.imageLink[0]}
                        />
                      </Link>
                      <Box sx={{ margin: "10px 20px" }}>
                        <Link to="/cart" style={{ textDecoration: "none !important" }}>
                          <Typography variant="body2" className="DesLinkOfPro" dir="rtl" sx={{ textAlign: "start", fontSize: { xl: "0.8rem", bx: "0.75rem", xs: "0.7rem" } }} color="text.secondary">
                            {item.description}
                          </Typography>
                        </Link>
                        <Typography gutterBottom variant="h5" dir="rtl" sx={{ textAlign: "start", fontSize: { xl: "1rem", bx: "0.75rem", xs: "0.75rem" } }} component="h5">
                          {item.quantity !== 1 ? (Number(item.price) * Number(item.quantity)).toFixed(2) : item.price} {''}
                          ريال
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton sx={{ color: "#1976d2", mr: "10px" }} size="small" onClick={() => {
                        dispatch(decreaseQuantity(item.id))
                      }}>
                        <Remove fontSize="small" />
                      </IconButton>

                      <StyledBadge badgeContent={item.quantity} color="secondary" />
                      <IconButton sx={{ color: "#1976d2", ml: "10px" }} size="small" onClick={() => {
                        dispatch(increaseQuantity(item.id))
                      }}>
                        <Add fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                  <Button variant="outlined" sx={{ color: theme.palette.primary.dark, borderColor: theme.palette.primary.dark, margin: "9px 0", mb: "12px", width: "100%", borderRadius: "30px !important" }} startIcon={<Delete />} onClick={() => {
                    dispatch(deleteFromCart(item.id))
                  }}>
                    حذف
                  </Button>
                </Paper>
              )
            })}


          </Box>


        </Stack>


      </Box>
    </HelmetProvider>
  );
}

export default Cart;