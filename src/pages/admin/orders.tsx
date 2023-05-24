import React from "react";
import type { NextPage } from "next";
import useSWR from "swr";
import ConfirmationNumberOutlined from "@mui/icons-material/ConfirmationNumberOutlined";
import { Chip, Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";
import { AdminLayout } from "@/components/layouts";
import type { OrderWithUser } from "@/interfaces";

const columns: GridColDef[] = [
  { field: "id", headerName: "Order ID", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "name", headerName: "Name", width: 150 },
  { field: "total", headerName: "Order amount", width: 130 },
  {
    field: "isPaid",
    headerName: "Paid",
    renderCell({ row }) {
      return row.isPaid ? (
        <Chip variant="outlined" label="Paid" color="success" />
      ) : (
        <Chip variant="outlined" label="Pending" color="error" />
      );
    },
  },
  { field: "noProducts", headerName: "N. of products", width: 130 },
  {
    field: "check",
    headerName: "See order",
    renderCell({ row }) {
      return (
        <a href={`/admin/orders/${row.id}`} target="_blank">
          Go to order
        </a>
      );
    },
  },
  { field: "createdAt", headerName: "Created at", width: 200 },
];

const OrdersPage: NextPage = () => {
  const { data = [], isLoading } = useSWR<OrderWithUser[]>("/api/admin/orders");

  const rows = data.map((order) => ({
    id: order.id,
    email: order.user.email,
    name: order.user.name,
    total: order.total,
    isPaid: order.isPaid,
    noProducts: order.numberOfItems,
    createdAt: order.createdAt,
  }));

  return (
    <AdminLayout
      title="Orders"
      subTitle="Orders Management Dashboard"
      icon={<ConfirmationNumberOutlined />}
    >
      <Grid container sx={{ pt: 2 }} className="fadeIn">
        <Grid item xs={12}>
          <DataGrid
            rows={rows}
            columns={columns}
            autoPageSize
            loading={isLoading}
            sx={{ height: "calc(100vh - 250px)" }}
          />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default OrdersPage;
