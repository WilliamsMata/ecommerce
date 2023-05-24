import React from "react";
import type { NextPage } from "next";
import Image from "next/image";
import useSWR from "swr";
import CategoryOutlined from "@mui/icons-material/CategoryOutlined";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import type { GridColDef } from "@mui/x-data-grid";

import { AdminLayout } from "@/components/layouts";
import type { CompleteProduct } from "@/interfaces";
import Link from "@/components/Link";

const columns: GridColDef[] = [
  {
    field: "img",
    headerName: "Image",
    renderCell({ row }) {
      return (
        <a href={`/products/${row.slug}`} target="_blank">
          <Image
            src={`/products/${row.img}`}
            alt={row.title}
            width={90}
            height={90}
          />
        </a>
      );
    },
    sortable: false,
  },
  {
    field: "title",
    headerName: "Title",
    width: 250,
    renderCell({ row }) {
      return (
        <Link
          href={`/admin/products/${row.slug}`}
          prefetch={false}
          underline="always"
        >
          {row.title}
        </Link>
      );
    },
  },
  { field: "gender", headerName: "Gender" },
  { field: "type", headerName: "Type" },
  { field: "inStock", headerName: "inStock" },
  { field: "price", headerName: "Price" },
  { field: "sizes", headerName: "Sizes", width: 180, sortable: false },
];

const ProductsPage: NextPage = () => {
  const { data = [], isLoading } = useSWR<CompleteProduct[]>(
    "/api/admin/products"
  );

  const rows = data.map((product) => ({
    id: product.id,
    img: product.images[0].url,
    title: product.title,
    gender: product.gender,
    type: product.type,
    inStock: product.inStock,
    price: product.price,
    sizes: product.sizes.map((size) => size.size).join(", "),
    slug: product.slug,
  }));

  return (
    <AdminLayout
      title={`Products ${data.length > 0 ? `(${data.length})` : ""}`}
      subTitle="Products Management Dashboard"
      icon={<CategoryOutlined />}
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

export default ProductsPage;
