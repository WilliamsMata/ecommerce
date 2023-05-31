import type { FC } from "react";
import { Grid, Skeleton } from "@mui/material";

export const SummaryTileSkeleton: FC = () => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Skeleton variant="rounded" width="100%" height={116} />
    </Grid>
  );
};
