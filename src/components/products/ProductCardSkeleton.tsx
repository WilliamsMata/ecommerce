import { Grid, Card, Box, Skeleton } from "@mui/material";

export const ProductCardSkeleton: React.FC = () => {
  return (
    <Grid item xs={6} sm={4}>
      <Card>
        <Skeleton variant="rounded" height="100%" sx={{ aspectRatio: "1/1" }} />
      </Card>

      <Box sx={{ mt: 1 }} className="fadeIn">
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
        <Skeleton variant="rounded" width={50} height={14} />
      </Box>
    </Grid>
  );
};
