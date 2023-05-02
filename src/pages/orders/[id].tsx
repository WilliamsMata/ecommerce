import { NextPage } from "next";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Chip,
} from "@mui/material";
import CreditCardOffOutlined from "@mui/icons-material/CreditCardOffOutlined";
import CreditScoreOutlined from "@mui/icons-material/CreditScoreOutlined";

import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts";
import Link from "@/components/Link";

const OrderPage: NextPage = () => {
  return (
    <ShopLayout
      title={"Order summary 1234124"}
      pageDescription={"Order summary"}
      maxWidth="lg"
    >
      <Typography variant="h1">Order: ABC123</Typography>

      {/* <Chip
        sx={{ my: 2 }}
        label="Pending payment"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      /> */}

      <Chip
        sx={{ my: 2 }}
        label="Paid order"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />

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

                <Link href="/checkout/address" underline="always">
                  Edit
                </Link>
              </Box>

              <Typography>Williams Mata</Typography>
              <Typography>Av 5 de Julio - Tejas Rojas</Typography>
              <Typography>Loma de Guerra, 6301</Typography>
              <Typography>Venezuela</Typography>
              <Typography>+58 4265870677</Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="end">
                <Link href="/cart" underline="always">
                  Edit
                </Link>
              </Box>

              <OrderSummary />

              <Box sx={{ mt: 2 }}>
                {/* Todo  */}
                <h1>Pagar</h1>

                <Chip
                  sx={{ my: 2 }}
                  label="Paid order"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
