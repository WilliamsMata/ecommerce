import { useContext } from "react";
import { NextPage } from "next";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
  Chip,
} from "@mui/material";
import { CartContext } from "@/context";
import Link from "@/components/Link";
import { ShopLayout } from "@/components/layouts";
import { CartList, OrderSummary } from "@/components/cart";
import { countries } from "@/utils";

const SummaryPage: NextPage = () => {
  const { shippingAddress, orderSummary } = useContext(CartContext);

  if (!shippingAddress) {
    return <></>;
  }

  const { address, address2, city, country, firstName, lastName, phone, zip } =
    shippingAddress;

  return (
    <ShopLayout
      title={"Order summary"}
      pageDescription={"Order summary"}
      maxWidth="lg"
    >
      <Typography variant="h1">Order summary</Typography>

      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} md={7}>
          <CartList />
        </Grid>

        <Grid item xs={12} md={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                <b>
                  Summary ({orderSummary.numberOfItems}{" "}
                  {orderSummary.numberOfItems === 1 ? "product" : "products"})
                </b>
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Shipping Address</Typography>

                <Link href="/checkout/address" underline="always">
                  Edit
                </Link>
              </Box>

              <Typography>
                {firstName} {lastName}
              </Typography>
              <Typography>{address}</Typography>
              <Typography>{address2}</Typography>
              <Typography>
                {city}, {zip}
              </Typography>
              <Typography>
                {countries.find((c) => c.code === country)?.name}
              </Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <Link href="/cart" underline="always">
                  Edit
                </Link>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 2 }}>
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  sx={{ py: 1 }}
                >
                  Confirm order
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
