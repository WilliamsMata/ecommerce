import { FC } from "react";
import { Box, IconButton, Typography } from "@mui/material";

import RemoveCircleOutline from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";

interface Props {
  currentValue: number;
  maxValue: number;
  updatedQuantity: (newValue: number) => void;
}

export const ItemCounter: FC<Props> = ({
  currentValue,
  maxValue,
  updatedQuantity,
}) => {
  const addOrRemove = (value: number) => {
    const newValue = Math.max(Math.min(currentValue + value, maxValue), 1);
    updatedQuantity(newValue);
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton onClick={(e) => addOrRemove(-1)} sx={{ p: 0 }}>
        <RemoveCircleOutline />
      </IconButton>

      <Typography sx={{ w: 40, textAlign: "center" }}>
        {currentValue}
      </Typography>

      <IconButton onClick={(e) => addOrRemove(+1)} sx={{ p: 0 }}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
