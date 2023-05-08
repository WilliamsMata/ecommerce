import { FC } from "react";
import { Box, Button } from "@mui/material";
import { Size } from "@prisma/client";

interface Props {
  selectedSize?: Size;
  sizes: { size: Size }[];
  onSelectedSize: (size: Size) => void;
}

export const SizeSelector: FC<Props> = ({
  selectedSize,
  sizes,
  onSelectedSize,
}) => {
  return (
    <Box>
      {sizes.map(({ size }) => (
        <Button
          onClick={() => onSelectedSize(size)}
          color={selectedSize === size ? "primary" : "info"}
          size="small"
          key={size}
          sx={{
            minWidth: 48,
            marginInline: 0.2,
          }}
        >
          {size}
        </Button>
      ))}
    </Box>
  );
};
