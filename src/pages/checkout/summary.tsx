import { useContext, useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
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
import Cookies from "js-cookie";

import { CartContext } from "@/context";
import Link from "@/components/Link";
import { ShopLayout } from "@/components/layouts";
import { CartList, OrderSummary } from "@/components/cart";

const SummaryPage: NextPage = () => {
  const router = useRouter();
  const { shippingAddress, orderSummary, createOrder } =
    useContext(CartContext);

  const [isPosting, setIsPosting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!Cookies.get("firstName")) {
      router.push("/checkout/address");
    }
  }, [router]);

  const onCreateOrder = async () => {
    setIsPosting(true);

    const { hasError, message } = await createOrder();

    if (hasError) {
      setIsPosting(false);
      setErrorMessage(message);
      return;
    }

    router.replace(`/orders/${message}`);
  };

  if (!shippingAddress) return <></>;

  const { address, address2, state, country, firstName, lastName, phone, zip } =
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
                {state}, {zip}
              </Typography>
              <Typography>{country}</Typography>
              <Typography>{phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <Link href="/cart" underline="always">
                  Edit
                </Link>
              </Box>

              <OrderSummary />

              <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 2 }}>
                <Button
                  onClick={onCreateOrder}
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  disabled={isPosting}
                >
                  Confirm order
                </Button>

                <Chip
                  color="error"
                  label={errorMessage}
                  sx={{ display: errorMessage ? "flex" : "none" }}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
