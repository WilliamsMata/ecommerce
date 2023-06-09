import { useState } from "react";
import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getServerSession } from "next-auth";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Box,
  Chip,
  CircularProgress,
} from "@mui/material";
import CreditCardOffOutlined from "@mui/icons-material/CreditCardOffOutlined";
import CreditScoreOutlined from "@mui/icons-material/CreditScoreOutlined";
import { PayPalButtons } from "@paypal/react-paypal-js";

import { tesloApi } from "@/api";
import { CartList, OrderSummary } from "@/components/cart";
import { ShopLayout } from "@/components/layouts";
import { getOrderById } from "@/server/orders";
import { MySession, authOptions } from "../api/auth/[...nextauth]";
import { CompleteOrder, OrderSummary as IOrderSummary } from "@/interfaces";

interface OrderRespondeBody {
  id: string;
  status:
    | "CREATED"
    | "SAVED"
    | "APPROVED"
    | "VOIDED"
    | "COMPLETED"
    | "PAYER_ACTION_REQUIRED";
}

interface Props {
  order: CompleteOrder;
}

const OrderPage: NextPage<Props> = ({ order }) => {
  const { shippingAddress } = order;

  const summary: IOrderSummary = {
    numberOfItems: order.numberOfItems,
    subTotal: order.subTotal,
    tax: order.tax,
    total: order.total,
  };

  const [isPaying, setIsPaying] = useState<boolean>(false);

  const router = useRouter();

  const onOrderCompleted = async (details: OrderRespondeBody) => {
    if (details.status !== "COMPLETED") {
      return alert("There is not payment on paypal");
    }

    setIsPaying(true);

    try {
      const { data } = await tesloApi.post(`/orders/pay`, {
        transactionId: details.id,
        orderId: order.id,
      });

      router.reload();
    } catch (error) {
      setIsPaying(false);
      console.log(error);
      alert("Error");
    }
  };

  return (
    <ShopLayout
      title={"Order summary"}
      pageDescription={"Order summary"}
      maxWidth="lg"
    >
      <Typography variant="h1">Order: {order.id}</Typography>

      {order.isPaid ? (
        <Chip
          sx={{ my: 2 }}
          label="Paid order"
          variant="outlined"
          color="success"
          icon={<CreditScoreOutlined />}
        />
      ) : (
        <Chip
          sx={{ my: 2 }}
          label="Pending payment"
          variant="outlined"
          color="error"
          icon={<CreditCardOffOutlined />}
        />
      )}

      <Grid container sx={{ mt: 2 }} className="fadeIn">
        <Grid item xs={12} md={7}>
          <CartList products={order.orderItems} />
        </Grid>

        <Grid item xs={12} md={5}>
          <Card className="summary-card">
            <CardContent>
              <Typography variant="h2">
                <b>
                  Summary ({order.numberOfItems}{" "}
                  {order.numberOfItems > 1 ? "products" : "product"})
                </b>
              </Typography>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" justifyContent="space-between">
                <Typography variant="subtitle1">Shipping Address</Typography>
              </Box>

              <Typography>
                {shippingAddress.firstName} {shippingAddress.lastName}
              </Typography>
              <Typography>
                {shippingAddress.address}{" "}
                {shippingAddress.address2
                  ? `, ${shippingAddress.address2}`
                  : ""}
              </Typography>
              <Typography>
                {shippingAddress.state}, {shippingAddress.zip}
              </Typography>
              <Typography>{shippingAddress.country}</Typography>
              <Typography>{shippingAddress.phone}</Typography>

              <Divider sx={{ my: 1 }} />

              <OrderSummary summary={summary} />

              <Box display="flex" flexDirection="column" sx={{ mt: 2 }}>
                <Box
                  justifyContent="center"
                  className="fadeIn"
                  sx={{ display: isPaying ? "flex" : "none" }}
                >
                  <CircularProgress />
                </Box>

                <Box sx={{ display: isPaying ? "none" : "block" }}>
                  {order.isPaid ? (
                    <Chip
                      label="Paid order"
                      variant="outlined"
                      color="success"
                      icon={<CreditScoreOutlined />}
                    />
                  ) : (
                    <PayPalButtons
                      createOrder={(data, actions) => {
                        return actions.order.create({
                          purchase_units: [
                            {
                              amount: {
                                value: `${order.total}`,
                              },
                            },
                          ],
                        });
                      }}
                      onApprove={(data, actions) => {
                        return actions.order!.capture().then((details) => {
                          onOrderCompleted(details);
                          // console.log({ details });
                          // const name = details.payer.name?.given_name || "";
                          // alert(`Transaction completed by ${name}`);
                        });
                      }}
                    />
                  )}
                </Box>
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
