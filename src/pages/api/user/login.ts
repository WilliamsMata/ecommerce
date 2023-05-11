import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { prisma } from "@/server";
import { Role } from "@prisma/client";
import { jwt } from "@/utils";

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: User;
    };

type User = {
  email: string;
  name: string;
  role: Role;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "POST":
      return loginUser(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }
}

async function loginUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { email = "", password = "" } = req.body;

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isCorrectPassword = bcrypt.compareSync(password, user.password);

  if (!isCorrectPassword)
    return res.status(401).json({ message: "Invalid credentials" });

  const { id, name, role } = user;

  const token = jwt.signToken(id, email);

  return res.status(200).json({
    token, //jwt
    user: { email, name, role },
  });
}
