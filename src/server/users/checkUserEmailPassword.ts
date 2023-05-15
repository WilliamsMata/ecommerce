import bcrypt from "bcryptjs";
import { prisma } from "../db";
import { SessionUser } from "@/interfaces";

export const checkUserEmailPassword = async (
  email: string,
  password: string
): Promise<SessionUser | null> => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return null;

  if (!bcrypt.compareSync(password, user.password)) return null;

  const { id, name, role } = user;

  return {
    id,
    name,
    email: email.toLowerCase(),
    role,
  };
};
