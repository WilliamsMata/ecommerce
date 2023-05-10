import jwt from "jsonwebtoken";

export const signToken = (id: string, email: string) => {
  if (!process.env.JWT_SECRET_SEED) {
    throw new Error(
      "There is no jwt seed, please add one on .env variables. JWT_SECRET_SEED is undefined"
    );
  }

  const payload = { id, email };
  const secretSeed = process.env.JWT_SECRET_SEED;

  return jwt.sign(payload, secretSeed, { expiresIn: "30d" });
};
