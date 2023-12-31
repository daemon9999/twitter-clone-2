import { NextApiRequest, NextApiResponse } from "next/types";
import bcrypt from "bcrypt";
import prisma from "@/libs/prismadb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { name, email, password, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: {
        name,
        hashedPassword,
        username,
        email,
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error)
    return res.status(400).end()
  }
}
