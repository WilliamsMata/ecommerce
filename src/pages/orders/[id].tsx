import { NextPage, GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
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
import { getOrderById } from "@/server/orders";
import { MySession, authOptions } from "../api/auth/[...nextauth]";
import { CompleteOrder } from "@/interfaces";

interface Props {
  order: CompleteOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  console.log({ order });

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

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  res,
  query,
}) => {
  const { id = "" } = query;

  const order = await getOrderById(id.toString());

  if (!order) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  const session: MySession | null = await getServerSession(
    req,
    res,
    authOptions
  );
  // middleware verify if there is a session

  if (order.userId !== session!.user.id) {
    return {
      redirect: {
        destination: "/orders/history",
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};

export default OrderPage;
