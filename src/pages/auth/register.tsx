import { NextPage } from "next";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "@/components/Link";
import { AuthLayout } from "@/components/layouts";

const RegisterPage: NextPage = () => {
  return (
    <AuthLayout title="Login">
      <Box sx={{ width: 350, px: 2, py: 1 }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h1">Create account</Typography>

          <TextField label="Name" fullWidth />

          <TextField label="Email" type="email" fullWidth />

          <TextField label="Password" type="password" fullWidth />

          <Button
            color="secondary"
            className="circular-btn"
            size="large"
            fullWidth
          >
            Create account
          </Button>

          <Box display="flex" justifyContent="end">
            <Link href="/auth/login" underline="always">
              Login
            </Link>
          </Box>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
