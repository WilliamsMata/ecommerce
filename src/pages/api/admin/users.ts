import type { NextApiRequest, NextApiResponse } from "next";
import { Role, User } from "@prisma/client";
import { prisma } from "@/server";
import { exclude, validations } from "@/utils";

type Data =
  | {
      message: string;
    }
  | Omit<User, "password">[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getUsers(req, res);

    case "PUT":
      return updateUser(req, res);

    default:
      return res.status(400).json({ message: "Bad request" });
  }
}

async function getUsers(req: NextApiRequest, res: NextApiResponse<Data>) {
  const users = (await prisma.user.findMany()).map((user) =>
    exclude(user, ["password"])
  );

  return res.status(200).json(users);
}
async function updateUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { userId = "", role = "" } = req.body;

  if (!validations.isUUID(userId)) {
    return res
      .status(404)
      .json({ message: `User with id ${userId} does not exist` });
  }

  const validRoles: Role[] = ["admin", "client", "seo", "super_user"];

  if (!validRoles.includes(role)) {
    return res.status(400).json({
      message: "Role not allowed. Valid roles: " + validRoles.join(", "),
    });
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      role,
    },
  });

  if (!user) {
    return res
      .status(404)
      .json({ message: `User with id ${userId} does not exist` });
  }

  return res.status(200).json({ message: "Updated user" });
}
