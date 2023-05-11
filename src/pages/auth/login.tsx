import { useState } from "react";
import { NextPage } from "next";
import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import { useForm } from "react-hook-form";
import Link from "@/components/Link";
import { AuthLayout } from "@/components/layouts";
import { validations } from "@/utils";
import { tesloApi } from "@/api";

type FormData = {
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const [showError, setShowError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    try {
      const { data } = await tesloApi.post("/user/login", { email, password });
      const { token, user } = data;
    } catch (error) {
      console.error("Credentials error");
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit(onLoginUser)} noValidate>
        <Box sx={{ width: 350, py: 1 }}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h1">Login</Typography>
            <Chip
              label="The login credentials are incorrect. Please try again"
              color="error"
              icon={<ErrorOutline />}
              className="fadeIn"
              sx={{ display: showError ? "flex" : "none" }}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              {...register("email", {
                required: "This field is required",
                validate: validations.isEmail,
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must contain at least 6 character",
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />

            <Button
              type="submit"
              color="secondary"
              className="circular-btn"
              size="large"
              fullWidth
              disabled={isSubmitting}
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
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
