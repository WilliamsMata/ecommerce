import { NextPage } from "next";
import { Box, Button, TextField, Typography } from "@mui/material";
import Link from "@/components/Link";
import { AuthLayout } from "@/components/layouts";

const LoginPage: NextPage = () => {
  return (
    <AuthLayout title="Login">
      <Box sx={{ width: 350, px: 2, py: 1 }}>
        <Box display="flex" flexDirection="column" gap={2}>
          <Typography variant="h1">Login</Typography>

          <TextField label="Email" type="email" fullWidth />

          <TextField label="Password" type="password" fullWidth />

          <Button
            color="secondary"
            className="circular-btn"
            size="large"
            fullWidth
          >
            Login
          </Button>

          <Box display="flex" justifyContent="end">
            <Link href="/auth/register" underline="always">
              Create account
            </Link>
          </Box>
        </Box>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
