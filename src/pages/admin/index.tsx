import { AdminLayout } from "@/components/layouts";
import DashboardOutlined from "@mui/icons-material/DashboardOutlined";

const DashboardPage = () => {
  return (
    <AdminLayout
      title="Dashboard"
      subTitle="Operations Monitoring and Control Dashboard"
      icon={<DashboardOutlined />}
    >
      <h3>Hola mundo</h3>
    </AdminLayout>
  );
};

export default DashboardPage;
