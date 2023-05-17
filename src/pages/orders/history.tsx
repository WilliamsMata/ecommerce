import { NextPage } from "next";
import { Chip, Grid, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";

import { ShopLayout } from "@/components/layouts";
import Link from "@/components/Link";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Full name", width: 300 },
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
        <Link href={`/orders/${params.row.id}`} underline="always">
          See order
        </Link>
      );
    },
  },
];

const rows = [
  { id: 1, paid: true, fullname: "Williams Mata" },
  { id: 2, paid: false, fullname: "Leida Rojas" },
  { id: 3, paid: true, fullname: "Daniela Mata" },
  { id: 4, paid: true, fullname: "Juan Morales" },
  { id: 5, paid: false, fullname: "Julia Rojas" },
  { id: 6, paid: true, fullname: "Daniel Alonzo" },
  { id: 7, paid: false, fullname: "Leonard Salazar" },
  { id: 8, paid: true, fullname: "Bryant Mata" },
  { id: 9, paid: true, fullname: "Daniela Mata" },
  { id: 10, paid: true, fullname: "Juan Morales" },
  { id: 11, paid: false, fullname: "Julia Rojas" },
  { id: 12, paid: true, fullname: "Daniel Alonzo" },
  { id: 13, paid: false, fullname: "Leonard Salazar" },
  { id: 14, paid: true, fullname: "Bryant Mata" },
];

const HistoryPage: NextPage = () => {
  return (
    <ShopLayout
      title={"Orders history"}
      pageDescription={"Customer order history"}
    >
      <Typography variant="h1">Orders history</Typography>

      <Grid container sx={{ pt: 2 }}>
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

export default HistoryPage;
