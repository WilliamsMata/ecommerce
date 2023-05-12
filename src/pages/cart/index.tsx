import { useContext, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { ShopLayout } from "@/components/layouts";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { CartContext } from "@/context";
import { CartList, OrderSummary } from "@/components/cart";

const CartPage: NextPage = () => {
  const router = useRouter();

  const { isLoaded, cart } = useContext(CartContext);

  useEffect(() => {
    if (isLoaded && cart.length === 0) {
      router.replace("/cart/empty");
    }
  }, [isLoaded, cart, router]);

  return (
    <ShopLayout
      title={`Cart - ${cart.length > 9 ? "+9" : cart.length}`}
      pageDescription={"Store shopping cart"}
      maxWidth="lg"
    >
      {!isLoaded || cart.length === 0 ? (
        <></>
      ) : (
        <>
          <Typography variant="h1">Cart</Typography>

          <Grid container sx={{ mt: 2 }}>
            <Grid item xs={12} md={7} component="section">
              <CartList editable />
            </Grid>

            <Grid item xs={12} md={5} component="section">
              <Card className="summary-card">
                <CardContent>
                  <Typography variant="h2">
                    <b>Order Summary</b>
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  <OrderSummary />

                  <Box sx={{ mt: 2 }}>
                    <Button
                      onClick={() => router.push("/checkout/address")}
                      color="secondary"
                      className="circular-btn"
                      fullWidth
                    >
                      Checkout
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </ShopLayout>
  );
};

export default CartPage;
