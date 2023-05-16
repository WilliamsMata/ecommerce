import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { prisma } from "@/server";
import { jwt, validations } from "@/utils";
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
    case "POST":
      return signUpUser(req, res);

    default:
      res.status(400).json({ message: "Bad request" });
  }
}

async function signUpUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  const {
    email = "",
    password = "",
    name = "",
  } = req.body as { email: string; password: string; name: string };

  /* 
    Validations
  */
  if (password.length < 6)
    return res
      .status(400)
      .json({ message: "The password must contain at least 6 characters" });

  if (name.length < 2)
    return res
      .status(400)
      .json({ message: "The name must contain at least 2 characters" });

  if (!validations.isValidEmail(email))
    return res.status(400).json({ message: "Invalid email" });

  /* 
    Service
  */
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user)
      return res.status(409).json({ message: "Email is already in use" });

    const newUser = await prisma.user.create({
      data: {
        name: name.toLowerCase(),
        email: email.toLowerCase(),
        password: bcrypt.hashSync(password),
        role: "client",
      },
      select: { id: true },
    });

    const token = jwt.signToken(newUser.id, email);

    return res.status(200).json({
      token, //jwt
      user: {
        id: newUser.id,
        email,
        name,
        role: "client",
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Check server logs" });
  }
}
