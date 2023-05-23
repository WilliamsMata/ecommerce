import React from "react";
import type { NextPage } from "next";
import { AdminLayout } from "@/components/layouts";
import ConfirmationNumberOutlined from "@mui/icons-material/ConfirmationNumberOutlined";

const OrdersPage: NextPage = () => {
  return (
    <AdminLayout
      title="Orders"
      subTitle="Orders Management Dashboard"
      icon={<ConfirmationNumberOutlined />}
    ></AdminLayout>
  );
};

export default OrdersPage;
