import { useEffect, useState } from "react";
import type { NextPage } from "next";
import type { Role, User } from "@prisma/client";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import useSWR from "swr";
import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PeopleOutline from "@mui/icons-material/PeopleOutline";

import { AdminLayout } from "@/components/layouts";

interface UserRow {
  id: string;
  email: string;
  name: string;
  role: Role;
}

const UsersPage: NextPage = () => {
  const { data, error, isLoading } =
    useSWR<Omit<User, "password">[]>("/api/admin/users");

  const [rows, setRows] = useState<UserRow[]>([]);

  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", width: 250 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "role", headerName: "Role", width: 300 },
  ];

  useEffect(() => {
    if (!data) return;

    setRows(
      data.map((user) => ({
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }))
    );
  }, [data]);

  return (
    <AdminLayout
      title="Users"
      subTitle="User Management Dashboard"
      icon={<PeopleOutline />}
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

export default UsersPage;
