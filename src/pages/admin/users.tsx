import { useEffect, useState } from "react";
import type { NextPage } from "next";
import type { Role, User } from "@prisma/client";
import type { GridColDef } from "@mui/x-data-grid";
import useSWR from "swr";
import { Grid, MenuItem, Select } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PeopleOutline from "@mui/icons-material/PeopleOutline";

import { AdminLayout } from "@/components/layouts";
import { tesloApi } from "@/api";

const UsersPage: NextPage = () => {
  const { data, error, isLoading } =
    useSWR<Omit<User, "password">[]>("/api/admin/users");

  const [users, setUsers] = useState<Omit<User, "password">[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  const onRoleUpdated = async (userId: string, newRole: Role) => {
    const previousUsers = [...users];

    const updatedUsers = users.map((user) => ({
      ...user,
      role: userId === user.id ? newRole : user.role,
    }));

    setUsers(updatedUsers);

    try {
      await tesloApi.put("/admin/users", { userId, role: newRole });
    } catch (error) {
      setUsers(previousUsers);
      console.log(error);
    }
  };

  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", width: 250 },
    { field: "name", headerName: "Name", width: 300 },
    {
      field: "role",
      headerName: "Role",
      width: 300,
      renderCell({ row }) {
        return (
          <Select
            value={row.role}
            label="Role"
            onChange={({ target }) => onRoleUpdated(row.id, target.value)}
            sx={{ width: "300px" }}
          >
            <MenuItem value="admin"> Admin</MenuItem>
            <MenuItem value="client">Client</MenuItem>
            <MenuItem value="super_user">Super user</MenuItem>
            <MenuItem value="seo">Seo</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = users.map((user) => ({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
  }));

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
