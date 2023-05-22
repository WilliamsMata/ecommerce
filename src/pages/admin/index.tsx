import { Grid, Typography } from "@mui/material";
import DashboardOutlined from "@mui/icons-material/DashboardOutlined";
import useSWR from "swr";

import CreditCardOffOutlined from "@mui/icons-material/CreditCardOffOutlined";
import AttachMoneyOutlined from "@mui/icons-material/AttachMoneyOutlined";
import CreditCardOutlined from "@mui/icons-material/CreditCardOutlined";
import GroupOutlined from "@mui/icons-material/GroupOutlined";
import CategoryOutlined from "@mui/icons-material/CategoryOutlined";
import CancelPresentationOutlined from "@mui/icons-material/CancelPresentationOutlined";
import ProductionQuantityLimitsOutlined from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined";

import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/layouts";
import { SummaryTile } from "@/components/admin";
import { FullScreenLoading } from "@/components/ui";
import { DashboardData } from "@/interfaces";

const DashboardPage = () => {
  const { data, error } = useSWR<DashboardData>("/api/admin/dashboard", {
    refreshInterval: 30 * 1000, // 30 seconds
  });

  const [refreshIn, setRefreshIn] = useState<number>(30);

  useEffect(() => {
    if (!data) return;

    const interval = setInterval(() => {
      setRefreshIn((prev) => (prev > 0 ? prev - 1 : 30));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [data]);

  if (error) {
    console.log(error);
  }

  return (
    <AdminLayout
      title="Dashboard"
      subTitle="Operations Monitoring and Control Dashboard"
      icon={<DashboardOutlined />}
    >
      {!error && !data && <FullScreenLoading />}

      {error && <Typography>Error loading information</Typography>}

      {data && (
        <Grid container spacing={2}>
          <SummaryTile
            title={data.numberOfOrders}
            subTitle="Total orders"
            icon={
              <CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />
            }
          />

          <SummaryTile
            title={data.paidOrders}
            subTitle="Paid orders"
            icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
          />

          <SummaryTile
            title={data.notPaidOrders}
            subTitle="Pending orders"
            icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
          />

          <SummaryTile
            title={data.numberOfClients}
            subTitle="Clients"
            icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
          />

          <SummaryTile
            title={data.numberOfProducts}
            subTitle="Products"
            icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
          />

          <SummaryTile
            title={data.productsWithNoInventory}
            subTitle="Out of stock"
            icon={
              <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
            }
          />

          <SummaryTile
            title={data.lowInventory}
            subTitle="Low inventory"
            icon={
              <ProductionQuantityLimitsOutlined
                color="warning"
                sx={{ fontSize: 40 }}
              />
            }
          />

          <SummaryTile
            title={refreshIn}
            subTitle="New update on:"
            icon={
              <AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />
            }
          />
        </Grid>
      )}
    </AdminLayout>
  );
};

export default DashboardPage;
