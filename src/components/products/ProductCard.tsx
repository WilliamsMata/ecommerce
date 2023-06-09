import { FC, useState } from "react";
import Image from "next/image";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Box,
  Typography,
  Chip,
} from "@mui/material";

import Link from "../Link";
import { GetProducts } from "@/interfaces";

interface Props {
  product: GetProducts;
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
        <Link href={`/products/${product.slug}`} prefetch={false}>
          <CardActionArea>
            {product.inStock === 0 && (
              <Chip
                color="primary"
                label="Not available"
                sx={{ position: "absolute", zIndex: 1, top: 10, left: 10 }}
              />
            )}

            <CardMedia
              sx={{
                height: "100%",
                aspectRatio: "1/1",
                position: "relative",
              }}
            >
              <Image
                src={product.images[0].url}
                alt={product.title}
                fill
                sizes="(max-width: 600px) 50vw,
                  33vw"
                className="fadeIn"
                style={{
                  objectFit: "cover",
                  display: isHovered ? "none" : "block",
                }}
                priority={true}
              />
              <Image
                src={product.images[1].url}
                alt={product.title}
                fill
                sizes="(max-width: 600px) 50vw,
                33vw"
                className="fadeIn"
                style={{
                  objectFit: "cover",
                  display: isHovered ? "block" : "none",
                }}
              />
            </CardMedia>
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
