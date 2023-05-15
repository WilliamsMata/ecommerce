import { prisma } from "../db";
import { SessionUser } from "@/interfaces";

export const oAuthToDbUser = async (
  oAuthEmail: string,
  oAuthName: string
): Promise<SessionUser> => {
  const user = await prisma.user.findUnique({ where: { email: oAuthEmail } });

  if (user) {
    const { id, name, email, role } = user;
    return { id, name, email, role };
  }

  const newUser = await prisma.user.create({
    data: {
      name: oAuthName,
      email: oAuthEmail,
      password: "@",
      role: "client",
    },
  });

  const { id, name, email, role } = newUser;
  return { id, name, email, role };
};
