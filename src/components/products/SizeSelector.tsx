import { FC } from "react";
import { Box, Button } from "@mui/material";
import { ISize } from "@/interfaces";

interface Props {
  selectedSize?: ISize;
  sizes: ISize[];
}

export const SizeSelector: FC<Props> = ({ selectedSize, sizes }) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
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
