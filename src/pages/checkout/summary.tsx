import { NextPage } from "next";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Button,
} from "@mui/material";
import { ShopLayout } from "@/components/layouts";
import { CartList, OrderSummary } from "@/components/cart";
import Link from "next/link";

const SummaryPage: NextPage = () => {
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
                <b>Summary (3 products)</b>
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Shipping Address</Typography>

                <Link href="/checkout/address">
                  <Typography sx={{ textDecoration: "underline" }}>
                    Edit
                  </Typography>
                </Link>
              </Box>

              <Typography>Williams Mata</Typography>
              <Typography>Av 5 de Julio - Tejas Rojas</Typography>
              <Typography>Loma de Guerra, 6301</Typography>
              <Typography>Venezuela</Typography>
              <Typography>+58 4265870677</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <Link href="/cart">
                  <Typography sx={{ textDecoration: "underline" }}>
                    Edit
                  </Typography>
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
