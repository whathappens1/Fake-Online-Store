import { Button, Card, CardActions, CardContent, Skeleton, Typography } from "@mui/material"

function LoadingProducts() {
    return (
        <Card sx={{ maxWidth: 320, margin: { xl: "1rem 40px !important", bx: "1rem 20px !important", xs: "1rem 20px !important" } }} variant="outlined">
            <Skeleton variant="rectangular" animation="wave" width={320} height={258} sx={{ maxWidth: "100%", maxHeight: "100%", padding: "1.2rem 3rem !important" }} />
            <CardContent>
                <Typography variant="body2" className="DesLinkOfPro" dir="rtl" sx={{ textAlign: "start", fontSize: { xl: "0.8rem", bx: "0.75rem", xs: "0.75rem" } }} color="text.secondary">
                    <Skeleton />
                </Typography>
                {/* <Rating name="half-rating-read" dir="rtl" sx={{ textAlign: "right", ml: "167px", mt: "6px" }} disabled defaultValue={0} precision={0.5} readOnly /> */}
                <Typography gutterBottom variant="h5" dir="auto" sx={{ textAlign: "start", fontSize: { xl: "1.5rem", bx: "1rem", xs: "1rem" } }} component="h5">
                    <Skeleton />
                </Typography>
            </CardContent>
            <CardActions dir="rtl" sx={{ textAlign: "start", mb: "10px" }}>
                <Button size="small" color="info" sx={{ mx: "10px", fontSize: { xl: "0.8125rem", bx: "0.72rem", xs: "0.72rem" }, cursor: "default" }}><Skeleton sx={{ width: "100%" }} /></Button>
                <Button size="small" color="info" sx={{ fontSize: { xl: "0.8125rem", bx: "0.72rem", xs: "0.72rem" }, cursor: "default" }}><Skeleton sx={{ width: "100%" }} /></Button>
            </CardActions>
        </Card>
    )
}

export default LoadingProducts