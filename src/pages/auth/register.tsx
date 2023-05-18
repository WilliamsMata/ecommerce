import { useContext, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
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
import { AuthContext } from "@/context";
import { AuthLayout } from "@/components/layouts";
import { validations } from "@/utils";

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterPage: NextPage = () => {
  const router = useRouter();

  const { registerUser } = useContext(AuthContext);

  const [showError, setShowError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onRegisterForm = async ({ name, email, password }: FormData) => {
    setShowError(false);

    const { hasError, message } = await registerUser(name, email, password);

    if (hasError) {
      setErrorMessage(message || "Failed to create user, please try again");
      setShowError(true);

      setTimeout(() => setShowError(false), 5000);
      return;
    }

    await signIn("credentials", { email, password });
  };

  return (
    <AuthLayout title="Login">
      <Box sx={{ width: "100%", maxWidth: 350 }}>
        <form onSubmit={handleSubmit(onRegisterForm)}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Typography variant="h1">Create account</Typography>

            <Chip
              label={errorMessage}
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
              <Link
                href={
                  router.query.p
                    ? `/auth/login?p=${router.query.p}`
                    : "/auth/login"
                }
                underline="always"
              >
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
