import { FC } from "react";
import { Box, IconButton, Typography } from "@mui/material";

import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";

interface Props {}

export const ItemCounter: FC<Props> = () => {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton sx={{ p: 0 }}>
        <RemoveCircleOutline />
      </IconButton>

      <Typography sx={{ w: 40, textAlign: "center" }}>1</Typography>

      <IconButton sx={{ p: 0 }}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
