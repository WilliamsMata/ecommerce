import { useContext, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import Cookies from "js-cookie";

import { CartContext } from "@/context";
import { ShopLayout } from "@/components/layouts";
import { countries } from "@/utils";
import { IShippingAddress } from "@/interfaces";

interface FormData extends IShippingAddress {}

const getAddressFromCookies = (): FormData => {
  return {
    firstName: Cookies.get("firstName") || "",
    lastName: Cookies.get("lastName") || "",
    address: Cookies.get("address") || "",
    address2: Cookies.get("address2") || "",
    zip: Cookies.get("zip") || "",
    state: Cookies.get("state") || "",
    country: Cookies.get("country") || "",
    phone: Cookies.get("phone") || "",
  };
};

const AddressPage: NextPage = () => {
  const router = useRouter();

  const { updateAddress } = useContext(CartContext);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      address2: "",
      zip: "",
      state: "",
      country: "",
      phone: "",
    },
  });

  useEffect(() => {
    reset(getAddressFromCookies());
  }, [reset]);

  const onFormSubmit = async (data: FormData) => {
    updateAddress(data);
    router.push("/checkout/summary");
  };

  return (
    <ShopLayout
      title="Checkout"
      pageDescription="Confirm destination address"
      maxWidth="lg"
    >
      <Typography variant="h1">Address</Typography>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        <>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                {...register("firstName", {
                  required: "This field is required",
                })}
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                variant="outlined"
                fullWidth
                {...register("lastName", {
                  required: "This field is required",
                })}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Street address"
                variant="outlined"
                fullWidth
                {...register("address", {
                  required: "This field is required",
                })}
                error={!!errors.address}
                helperText={errors.address?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Street address 2"
                variant="outlined"
                fullWidth
                {...register("address2")}
                error={!!errors.address2}
                helperText={errors.address2?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Postal code"
                variant="outlined"
                fullWidth
                {...register("zip", {
                  required: "This field is required",
                })}
                error={!!errors.zip}
                helperText={errors.zip?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="State"
                variant="outlined"
                fullWidth
                {...register("state", {
                  required: "This field is required",
                })}
                error={!!errors.state}
                helperText={errors.state?.message}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="country"
                rules={{
                  required: { value: true, message: "This field is required" },
                }}
                render={({ field }) => (
                  <TextField
                    select
                    label="Country"
                    fullWidth
                    {...field}
                    error={!!errors.country}
                    helperText={errors.country?.message}
                  >
                    {countries.map(({ code, name }) => (
                      <MenuItem key={code} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone number"
                variant="outlined"
                fullWidth
                {...register("phone", {
                  required: "This field is required",
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }} display="flex" justifyContent="center">
            <Button
              type="submit"
              color="secondary"
              className="circular-btn"
              size="large"
            >
              Checkout
            </Button>
          </Box>
        </>
      </form>
    </ShopLayout>
  );
};

export default AddressPage;
