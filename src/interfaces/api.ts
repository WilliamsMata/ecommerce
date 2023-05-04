export interface GetProducts {
  images: { url: string; order: number }[];
  title: string;
  inStock: number;
  price: number;
  slug: string;
}
