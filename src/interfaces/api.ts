export interface GetProducts {
  images: { url: string }[];
  title: string;
  inStock: number;
  price: number;
  slug: string;
}
