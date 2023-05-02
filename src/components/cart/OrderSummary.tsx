import { Grid, Typography } from "@mui/material";

export const OrderSummary = () => {
  return (
    <Grid container>
      {/* Quantity of products */}
      <Grid item xs={6}>
        <Typography>N. Products</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>3</Typography>
      </Grid>

      {/* Subtotal */}
      <Grid item xs={6}>
        <Typography>
          <b>Subtotal</b>
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          <b>${155.36}</b>
        </Typography>
      </Grid>

      {/* Taxes */}
      <Grid item xs={6}>
        <Typography>Taxes (15%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>${35.34}</Typography>
      </Grid>

      {/* Total */}
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total: </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }}>
        <Typography variant="subtitle1">${186.35}</Typography>
      </Grid>
    </Grid>
  );
};
