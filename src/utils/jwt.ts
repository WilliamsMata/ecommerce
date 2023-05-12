import jwt from "jsonwebtoken";

const secretSeed = process.env.JWT_SECRET_SEED;

export const signToken = (id: string, email: string) => {
  if (!secretSeed) {
    throw new Error(
      "There is no jwt seed, please add one on .env variables. JWT_SECRET_SEED is undefined"
    );
  }

  const payload = { id, email };

  return jwt.sign(payload, secretSeed, { expiresIn: "30d" });
};

export const isValidToken = (token: string): Promise<string> => {
  if (!secretSeed) {
    throw new Error(
      "There is no jwt seed, please add one on .env variables. JWT_SECRET_SEED is undefined"
    );
  }

  if (token.length <= 10) {
    return Promise.reject("Invalid JWT");
  }

  return new Promise((resolve, reject) => {
    jwt.verify(token, secretSeed, (err, payload) => {
      if (err) return reject("Invalid JWT");

      const { id } = payload as { id: string };

      resolve(id);
    });
  });
};
