import { useContext } from "react";
import { Grid, Typography } from "@mui/material";
import { CartContext } from "@/context";
import { currency } from "@/utils";

export const OrderSummary = () => {
  const { orderSummary } = useContext(CartContext);
  const { numberOfItems, subTotal, tax, total } = orderSummary;

  return (
    <Grid container>
      {/* Quantity of products */}
      <Grid item xs={6}>
        <Typography>N. Products</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{numberOfItems}</Typography>
      </Grid>

      {/* Subtotal */}
      <Grid item xs={6}>
        <Typography>
          <b>Subtotal</b>
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>
          <b>{currency.format(subTotal)}</b>
        </Typography>
      </Grid>

      {/* Taxes */}
      <Grid item xs={6}>
        <Typography>
          Taxes ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)
        </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end">
        <Typography>{currency.format(tax)}</Typography>
      </Grid>

      {/* Total */}
      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total: </Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }}>
        <Typography variant="subtitle1">{currency.format(total)}</Typography>
      </Grid>
    </Grid>
  );
};
