import type { GetServerSideProps, NextPage } from "next";
import {
  Box,
  Button,
  capitalize,
  Card,
  CardActions,
  CardMedia,
  Checkbox,
  Chip,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import DriveFileRenameOutline from "@mui/icons-material/DriveFileRenameOutline";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import UploadOutlined from "@mui/icons-material/UploadOutlined";

import { getProductBySlug } from "@/server/products";
import { AdminLayout } from "@/components/layouts";
import type { CompleteProduct } from "@/interfaces";
import type { Gender, Size, Type } from "@prisma/client";

const validTypes: Type[] = ["shirts", "pants", "hoodies", "hats"];
const validGender: Gender[] = ["men", "women", "kid", "unisex"];
const validSizes: Size[] = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

interface Props {
  product: CompleteProduct;
}

const ProductAdminPage: NextPage<Props> = ({ product }) => {
  const onDeleteTag = (tag: string) => {};

  return (
    <AdminLayout
      title={"Product"}
      subTitle={`Editing: ${product.title}`}
      icon={<DriveFileRenameOutline />}
    >
      <form>
        <Box display="flex" justifyContent="end" sx={{ mb: 1 }}>
          <Button
            color="secondary"
            startIcon={<SaveOutlined />}
            sx={{ width: "150px" }}
            type="submit"
          >
            Save
          </Button>
        </Box>

        <Grid container spacing={2}>
          {/* Data */}
          <Grid
            item
            xs={12}
            md={6}
            display="Flex"
            flexDirection="column"
            gap={1}
          >
            <TextField
              label="Title"
              variant="filled"
              fullWidth

              // { ...register('name', {
              //     required: 'Este campo es requerido',
              //     minLength: { value: 2, message: 'Mínimo 2 caracteres' }
              // })}
              // error={ !!errors.name }
              // helperText={ errors.name?.message }
            />

            <TextField
              label="Description"
              variant="filled"
              fullWidth
              multiline
            />

            <TextField
              label="In stock"
              type="number"
              variant="filled"
              fullWidth
            />

            <TextField label="Price" type="number" variant="filled" fullWidth />

            <Divider sx={{ my: 1 }} />

            <FormControl>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                row
                // value={ status }
                // onChange={ onStatusChanged }
              >
                {validTypes.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup
                row
                // value={ status }
                // onChange={ onStatusChanged }
              >
                {validGender.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio color="secondary" />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <FormGroup>
              <FormLabel>Sizes</FormLabel>
              {validSizes.map((size) => (
                <FormControlLabel
                  key={size}
                  control={<Checkbox />}
                  label={size}
                />
              ))}
            </FormGroup>
          </Grid>

          {/* Tags e imagenes */}
          <Grid
            item
            xs={12}
            md={6}
            display="flex"
            flexDirection="column"
            gap={1}
          >
            <TextField label="Slug - URL" variant="filled" fullWidth />

            <TextField
              label="Tags"
              variant="filled"
              fullWidth
              helperText="Presiona [spacebar] para agregar"
            />

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                listStyle: "none",
                p: 0,
                m: 0,
              }}
            >
              {product.tags.map((tag) => {
                return (
                  <Chip
                    key={tag.name}
                    label={tag.name}
                    onDelete={() => onDeleteTag(tag.name)}
                    color="primary"
                    size="small"
                  />
                );
              })}
            </Box>

            <Divider />

            <Box display="flex" flexDirection="column" gap={1}>
              <FormLabel>Images</FormLabel>
              <Button
                color="secondary"
                fullWidth
                startIcon={<UploadOutlined />}
              >
                Load images
              </Button>

              <Chip
                label="At least 2 images are required"
                color="error"
                variant="outlined"
              />

              <Grid container spacing={2}>
                {product.images.map((img) => (
                  <Grid item xs={4} sm={3} key={img.url}>
                    <Card>
                      <CardMedia
                        component="img"
                        className="fadeIn"
                        image={`/products/${img.url}`}
                        alt={img.url}
                      />
                      <CardActions>
                        <Button fullWidth color="error">
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
    </AdminLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { slug = "" } = query;

  const product = await getProductBySlug(slug.toString());

  if (!product) {
    return {
      redirect: {
        destination: "/admin/products",
        permanent: false,
      },
    };
  }

  return {
    props: {
      product,
    },
  };
};

export default ProductAdminPage;
