import { NextPage } from "next";
import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ShopLayout } from "@/components/layouts";

const AddressPage: NextPage = () => {
  return (
    <ShopLayout
      title="Checkout"
      pageDescription="Confirm destination address"
      maxWidth="lg"
    >
      <Typography variant="h1">Address</Typography>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <TextField label="Name" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Last Name" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Street address" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Street address 2" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Postal code" variant="filled" fullWidth />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="City" variant="filled" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <Select variant="filled" label="Country" value={1}>
              <MenuItem value={1}>Costa Rica</MenuItem>
              <MenuItem value={2}>Honduras</MenuItem>
              <MenuItem value={3}>Mexico</MenuItem>
              <MenuItem value={4}>Venezuela</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField label="Phone number" variant="filled" fullWidth />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4 }} display="flex" justifyContent="center">
        <Button color="secondary" className="circular-btn" size="large">
          Checkout
        </Button>
      </Box>
    </ShopLayout>
  );
};

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const { token = "" } = req.cookies;

//   let isValidToken = false;

//   try {
//     await jwt.isValidToken(token);
//     isValidToken = true;
//   } catch (error) {
//     isValidToken = false;
//   }

//   if (!isValidToken) {
//     return {
//       redirect: {
//         destination: "/auth/login?p=/checkout/address",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };

export default AddressPage;
