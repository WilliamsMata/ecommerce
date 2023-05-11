import { useState } from "react";
import { NextPage } from "next";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import { useForm } from "react-hook-form";
import Link from "@/components/Link";
import { tesloApi } from "@/api";
import { AuthLayout } from "@/components/layouts";
import { validations } from "@/utils";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage: NextPage = () => {
  const [showError, setShowError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false);

    try {
      const { data } = await tesloApi.post("/user/signup", {
        name,
        email,
        password,
      });
      const { token, user } = data;

      console.log({ token, user });
    } catch (error) {
      console.error("Credentials error");
      setShowError(true);
      setTimeout(() => setShowError(false), 10000);
    }
  };

  return (
    <AuthLayout title="Login">
      <Box sx={{ width: "100%", maxWidth: 350 }}>
        <form onSubmit={handleSubmit(onRegisterForm)}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h1">Create account</Typography>

            <Chip
              label="The login credentials are incorrect. Please try again"
              color="error"
              icon={<ErrorOutline />}
              className="fadeIn"
              sx={{ display: showError ? "flex" : "none" }}
            />

            <TextField
              label="Name"
              fullWidth
              {...register("name", {
                minLength: {
                  value: 2,
                  message: "This field must contain at least 2 characters",
                },
                required: "Your name is required",
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />

            <TextField
              label="Email"
              type="email"
              fullWidth
              {...register("email", {
                required: "Your name is required",
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
              {isSubmitting ? (
                <CircularProgress thickness={2} size={26.3} />
              ) : (
                "Create account"
              )}
            </Button>

            <Box display="flex" justifyContent="end">
              <Link href="/auth/login" underline="always">
                Login
              </Link>
            </Box>
          </Box>
        </form>
      </Box>
    </AuthLayout>
  );
};

export default RegisterPage;
