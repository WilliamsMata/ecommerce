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
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import DriveFileRenameOutline from "@mui/icons-material/DriveFileRenameOutline";
import SaveOutlined from "@mui/icons-material/SaveOutlined";
import UploadOutlined from "@mui/icons-material/UploadOutlined";

import { getProductBySlug } from "@/server/products";
import { AdminLayout } from "@/components/layouts";
import type { CompleteProduct } from "@/interfaces";
import type { Gender, Size, Type } from "@prisma/client";
import { useEffect } from "react";

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
  inputTag: string;
  tags: string[];
  title: string;
  type: Type;
  gender: Gender;
}

interface Props {
  product: CompleteProduct;
}

const ProductAdminPage: NextPage<Props> = ({ product }) => {
  console.log("Rendered");

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
    control,
  } = useForm<FormData>({
    defaultValues: {
      ...product,
      images: product.images.map((image) => image.url),
      sizes: product.sizes.map((size) => size.size),
      tags: product.tags.map((tag) => tag.name),
      inputTag: "",
    },
  });

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        const newSlug =
          value.title
            ?.trim()
            .replaceAll(" ", "_")
            .replaceAll("'", "")
            .toLowerCase() || "";

        setValue("slug", newSlug);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [watch, setValue]);

  const onAddNewTag = () => {
    const tags = getValues("tags");
    const newTag = getValues("inputTag").toLowerCase();

    if (newTag.length > 1 && !tags.includes(newTag)) {
      setValue("tags", [...getValues("tags"), newTag]);
      setValue("inputTag", "");
    }
  };

  const onDeleteTag = (tag: string) => {
    setValue(
      "tags",
      getValues("tags").filter((t) => t !== tag)
    );
  };

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
          <Grid item xs={12} md={6}>
            <Box display="Flex" flexDirection="column" gap={1}>
              <TextField
                label="Title"
                variant="filled"
                fullWidth
                autoComplete="off"
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
            </Box>

            <Divider sx={{ my: 1 }} />

            <Box>
              <FormLabel>Type</FormLabel>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <RadioGroup row aria-label="Type" {...field}>
                    {validTypes.map((option) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio color="secondary" />}
                        label={capitalize(option)}
                      />
                    ))}
                  </RadioGroup>
                )}
              />

              <FormLabel>Gender</FormLabel>
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <RadioGroup row aria-label="Gender" {...field}>
                    {validGender.map((option) => (
                      <FormControlLabel
                        key={option}
                        value={option}
                        control={<Radio color="secondary" />}
                        label={capitalize(option)}
                      />
                    ))}
                  </RadioGroup>
                )}
              />

              <FormLabel>Sizes</FormLabel>
              <Box display="flex" flexWrap="wrap">
                <Controller
                  control={control}
                  name="sizes"
                  render={({ field }) => (
                    <>
                      {validSizes.map((size) => (
                        <FormControlLabel
                          key={size}
                          label={size}
                          control={
                            <Checkbox
                              checked={field.value.includes(size)}
                              onChange={(e) => {
                                if (field.value.includes(size)) {
                                  return field.onChange(
                                    field.value.filter((s) => s !== size)
                                  );
                                }
                                field.onChange([...field.value, size]);
                              }}
                            />
                          }
                        />
                      ))}
                    </>
                  )}
                />
              </Box>
            </Box>
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
              autoComplete="off"
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
              autoComplete="off"
              helperText="Press [spacebar] to add"
              {...register("inputTag")}
              onKeyDown={(e) => {
                if (
                  e.code === "Tab" ||
                  e.code === "Space" ||
                  e.code === "Enter"
                ) {
                  e.preventDefault();
                  onAddNewTag();
                }
              }}
            />

            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                listStyle: "none",
                gap: 0.5,
                p: 0,
                m: 0,
              }}
            >
              <Controller
                control={control}
                name="tags"
                render={({ field }) => (
                  <>
                    {field.value.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        onDelete={() => onDeleteTag(tag)}
                        color="primary"
                        size="small"
                      />
                    ))}
                  </>
                )}
              />
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
