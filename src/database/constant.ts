import { Gender } from "@prisma/client";

interface ShopConstant {
  validGenders: Gender[];
}

export const SHOP_CONSTANT: ShopConstant = {
  validGenders: ["men", "women", "kid", "unisex"],
};
