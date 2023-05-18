import { NextPage, GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { Chip, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { ShopLayout } from "@/components/layouts";
import Link from "@/components/Link";
import { MySession, authOptions } from "../api/auth/[...nextauth]";
import { getOrdersByUserId } from "@/server/orders";
import { OrderHistory } from "@/interfaces";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullName", headerName: "Full name", width: 300 },
  {
    field: "paid",
    headerName: "Paid",
    description: "Shows information if the order is paid or not",
    width: 200,
    renderCell(params: GridRenderCellParams) {
      return params.row.paid ? (
        <Chip color="success" label="Paid" variant="outlined" />
      ) : (
        <Chip color="error" label="Not paid" variant="outlined" />
      );
    },
  },
  {
    field: "order",
    headerName: "Show order",
    width: 200,
    sortable: false,
    renderCell(params: GridRenderCellParams) {
      return (
        <Link href={`/orders/${params.row.order}`} underline="always">
          See order
        </Link>
      );
    },
  },
];

interface Props {
  orders: OrderHistory[];
}

const HistoryPage: NextPage<Props> = ({ orders }) => {
  const rows = orders.map((order, i) => ({
    id: i + 1,
    paid: order.paid,
    fullName: order.fullName,
    order: order.id,
  }));

  return (
    <ShopLayout
      title={"Orders history"}
      pageDescription={"Customer order history"}
    >
      <Typography variant="h1">Orders history</Typography>

      <Grid container sx={{ pt: 2 }} className="fadeIn">
        <Grid item xs={12}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoPageSize
            sx={{ height: "calc(100vh - 250px)" }}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
  res,
}) => {
  const session: MySession | null = await getServerSession(
    req,
    res,
    authOptions
  );
  // Session is always true (Checked in middleware)

  const orders = await getOrdersByUserId(session!.user.id);

  return {
    props: {
      orders,
    },
  };
};

export default HistoryPage;
