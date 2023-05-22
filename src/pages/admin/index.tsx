import { Grid } from "@mui/material";
import DashboardOutlined from "@mui/icons-material/DashboardOutlined";

import CreditCardOffOutlined from "@mui/icons-material/CreditCardOffOutlined";
import AttachMoneyOutlined from "@mui/icons-material/AttachMoneyOutlined";
import CreditCardOutlined from "@mui/icons-material/CreditCardOutlined";
import GroupOutlined from "@mui/icons-material/GroupOutlined";
import CategoryOutlined from "@mui/icons-material/CategoryOutlined";
import CancelPresentationOutlined from "@mui/icons-material/CancelPresentationOutlined";
import ProductionQuantityLimitsOutlined from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import AccessTimeOutlined from "@mui/icons-material/AccessTimeOutlined";

import { AdminLayout } from "@/components/layouts";
import { SummaryTile } from "@/components/admin";

const DashboardPage = () => {
  return (
    <AdminLayout
      title="Dashboard"
      subTitle="Operations Monitoring and Control Dashboard"
      icon={<DashboardOutlined />}
    >
      <Grid container spacing={2}>
        <SummaryTile
          title={1}
          subTitle="Total orders"
          icon={<CreditCardOutlined color="secondary" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={2}
          subTitle="Paid orders"
          icon={<AttachMoneyOutlined color="success" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={3}
          subTitle="Pending orders"
          icon={<CreditCardOffOutlined color="error" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={4}
          subTitle="Clients"
          icon={<GroupOutlined color="primary" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={5}
          subTitle="Products"
          icon={<CategoryOutlined color="warning" sx={{ fontSize: 40 }} />}
        />

        <SummaryTile
          title={6}
          subTitle="Out of stock"
          icon={
            <CancelPresentationOutlined color="error" sx={{ fontSize: 40 }} />
          }
        />

        <SummaryTile
          title={7}
          subTitle="Low inventory"
          icon={
            <ProductionQuantityLimitsOutlined
              color="warning"
              sx={{ fontSize: 40 }}
            />
          }
        />

        <SummaryTile
          title={8}
          subTitle="New update on:"
          icon={<AccessTimeOutlined color="secondary" sx={{ fontSize: 40 }} />}
        />
      </Grid>
    </AdminLayout>
  );
};

export default DashboardPage;
