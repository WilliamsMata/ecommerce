import { FC, useState } from "react";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
} from "@mui/material";
import { IProduct } from "@/interfaces";
import Link from "../Link";

interface Props {
  product: IProduct;
}

export const ProductCard: FC<Props> = ({ product }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <Grid
      item
      xs={6}
      sm={4}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card>
        <Link href="/products/slug" prefetch={false}>
          <CardActionArea>
            <CardMedia
              component="img"
              image={`products/${product.images[0]}`}
              alt={product.title}
              className="fadeIn"
              sx={{ display: isHovered ? "none" : "block" }}
            />
            <CardMedia
              component="img"
              image={`products/${product.images[1]}`}
              alt={product.title}
              className="fadeIn"
              sx={{ display: isHovered ? "block" : "none" }}
            />
          </CardActionArea>
        </Link>
      </Card>

      <Box sx={{ mt: 1 }} className="fadeIn">
        <Typography fontWeight="700">{product.title}</Typography>
        <Typography fontWeight="500">${product.price}</Typography>
      </Box>
    </Grid>
  );
};
