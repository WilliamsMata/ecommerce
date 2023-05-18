import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/server";
import { jwt } from "@/utils";
import { SessionUser } from "@/interfaces";

type Data =
  | {
      message: string;
    }
  | {
      token: string;
      user: SessionUser;
    };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return checkJWT(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }
}

async function checkJWT(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { token = "" } = req.cookies;

  let userId = "";

  try {
    userId = await jwt.isValidToken(token);
  } catch (error) {
    return res.status(401).json({
      message: "Invalid JWT",
    });
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) return res.status(400).json({ message: "User doesn't exist" });

  const { id, name, email, role } = user;

  return res.status(200).json({
    token: jwt.signToken(id, email),
    user: { id, email, name, role },
  });
}
