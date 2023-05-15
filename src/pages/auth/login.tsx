import { useEffect, useState } from "react";
import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/router";
import {
  getSession,
  signIn,
  getProviders,
  LiteralUnion,
  ClientSafeProvider,
} from "next-auth/react";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import ErrorOutline from "@mui/icons-material/ErrorOutline";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useForm } from "react-hook-form";

import Link from "@/components/Link";
import { AuthLayout } from "@/components/layouts";
import { validations } from "@/utils";
import { BuiltInProviderType } from "next-auth/providers";

type FormData = {
  email: string;
  password: string;
};

const LoginPage: NextPage = () => {
  const router = useRouter();
  // const { loginUser } = useContext(AuthContext);

  const [showError, setShowError] = useState<boolean>(false);

  const [providers, setProviders] =
    useState<
      Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
    >();

  useEffect(() => {
    getProviders().then((prov) => {
      if (prov) {
        setProviders(prov);
      }
    });
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onLoginUser = async ({ email, password }: FormData) => {
    setShowError(false);

    // const isValidLogin = await loginUser(email, password);

    // if (!isValidLogin) {
    //   setShowError(true);
    //   setTimeout(() => setShowError(false), 5000);
    //   return;
    // }

    // const destination = router.query.p?.toString() || "/";
    // router.replace(destination);

    await signIn("credentials", { email, password });
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

            <Divider> Or </Divider>

            {/* ----- PROVIDERS BUTTONS ----- */}
            <Box display="flex" flexDirection="column" gap={2}>
              {Object.values(providers || {}).map((provider) => {
                if (provider.id === "credentials") return undefined;

                let icon;
                switch (provider.id) {
                  case "google":
                    icon = <GoogleIcon />;
                    break;

                  case "github":
                    icon = <GitHubIcon />;
                    break;
                }

                return (
                  <Button
                    key={provider.id}
                    variant="outlined"
                    color="primary"
                    size="large"
                    fullWidth
                    startIcon={icon}
                    onClick={() => signIn(provider.id)}
                  >
                    {provider.name}
                  </Button>
                );
              })}
            </Box>
          </Box>
        </form>
      </Box>
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });

  const { p = "/" } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default LoginPage;
