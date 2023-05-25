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
import { useForm } from "react-hook-form";
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

interface FormData {
  id?: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  type: Type;
  gender: Gender;
}

interface Props {
  product: CompleteProduct;
}

const ProductAdminPage: NextPage<Props> = ({ product }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      ...product,
      images: product.images.map((image) => image.url),
      sizes: product.sizes.map((size) => size.size),
      tags: product.tags.map((tag) => tag.name),
    },
  });

  const onChangeSize = (size: Size) => {
    const currentSizes = getValues("sizes");

    if (currentSizes.includes(size)) {
      // delete
      return setValue(
        "sizes",
        currentSizes.filter((s) => s !== size),
        { shouldValidate: true }
      );
    }

    // add
    setValue("sizes", [...currentSizes, size], { shouldValidate: true });
  };

  const onDeleteTag = (tag: string) => {};

  const onSubmitForm = (form: FormData) => {
    console.log(form);
  };

  return (
    <AdminLayout
      title={"Product"}
      subTitle={`Editing: ${product.title}`}
      icon={<DriveFileRenameOutline />}
    >
      <form onSubmit={handleSubmit(onSubmitForm)}>
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
              {...register("title", {
                required: "This field is required",
                minLength: { value: 2, message: "Mínimo 2 caracteres" },
              })}
              error={!!errors.title}
              helperText={errors.title?.message}
            />

            <TextField
              label="Description"
              variant="filled"
              fullWidth
              multiline
              rows={6}
              {...register("description", {
                required: "This field is required",
              })}
              error={!!errors.description}
              helperText={errors.description?.message}
            />

            <TextField
              label="In stock"
              type="number"
              variant="filled"
              fullWidth
              {...register("inStock", {
                required: "This field is required",
                min: { value: 0, message: "Minimum value cero" },
              })}
              error={!!errors.inStock}
              helperText={errors.inStock?.message}
            />

            <TextField
              label="Price"
              type="number"
              variant="filled"
              fullWidth
              {...register("price", {
                required: "This field is required",
                min: { value: 0, message: "Minimum value cero" },
              })}
              error={!!errors.price}
              helperText={errors.price?.message}
            />

            <Divider sx={{ my: 1 }} />

            <FormControl>
              <FormLabel>Type</FormLabel>
              <RadioGroup
                row
                value={getValues("type")}
                onChange={(event) =>
                  setValue("type", event.target.value as Type, {
                    shouldValidate: true,
                  })
                }
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
                value={getValues("gender")}
                onChange={(event) =>
                  setValue("gender", event.target.value as Gender, {
                    shouldValidate: true,
                  })
                }
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
                  control={
                    <Checkbox checked={getValues("sizes").includes(size)} />
                  }
                  label={size}
                  onChange={() => onChangeSize(size)}
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
            <TextField
              label="Slug - URL"
              variant="filled"
              fullWidth
              {...register("slug", {
                required: "This field is required",
                validate: (value) =>
                  value.trim().includes(" ")
                    ? "Cannot have blank spaces"
                    : undefined,
              })}
              error={!!errors.slug}
              helperText={errors.slug?.message}
            />

            <TextField
              label="Tags"
              variant="filled"
              fullWidth
              helperText="Press [spacebar] to add"
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
              {product.tags.map((tag) => (
                <Chip
                  key={tag.id}
                  label={tag.name}
                  onDelete={() => onDeleteTag(tag.name)}
                  color="primary"
                  size="small"
                />
              ))}
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
