import { useContext, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
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
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const router = useRouter();

  const { loginUser } = useContext(AuthContext);

  const [showError, setShowError] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    const isValidLogin = await loginUser(email, password);

    if (!isValidLogin) {
      setShowError(true);
      setTimeout(() => setShowError(false), 5000);
      return;
    }

    const destination = router.query.p?.toString() || "/";
    router.replace(destination);
  };

  return (
    <AuthLayout title="Login">
      <Box sx={{ width: "100%", maxWidth: 350 }}>
        <form onSubmit={handleSubmit(onLoginUser)} noValidate>
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
              {isSubmitting ? (
                <CircularProgress thickness={2} size={26.3} />
              ) : (
                "Login"
              )}
            </Button>

            <Box display="flex" justifyContent="end">
              <Link
                href={
                  router.query.p
                    ? `/auth/register?p=${router.query.p}`
                    : "/auth/register"
                }
                underline="always"
              >
                Create account
              </Link>
            </Box>
          </Box>
        </form>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;
