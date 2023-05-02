import { NextPage } from "next";
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
import { CartList } from "@/components/cart";

const CartPage: NextPage = () => {
  return (
    <ShopLayout
      title={"Cart - 3"}
      pageDescription={"Store shopping cart"}
      maxWidth="lg"
    >
      <Typography variant="h1">Cart</Typography>

      <Grid container>
        <Grid item xs={12} md={7}>
          <CartList />
        </Grid>

        <Grid item xs={12} md={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">Order</Typography>

              <Divider sx={{ my: 1 }} />

              {/* Order Summary */}

              <Box sx={{ mt: 2 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
