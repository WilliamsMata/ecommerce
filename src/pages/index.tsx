import Link from "@/components/Link";
import { Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <Typography variant="h1">Teslo Shop</Typography>
      <Link href={"/about"}>About</Link>
    </>
  );
}
