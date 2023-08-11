import { prisma } from "@/prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, {});
  if (!session) {
    return res.status(401).json({ message: "Please log in!" });
  }

  if (!session.user?.email) {
    return res.status(401).json({ message: "Please log in!" });
  }

  console.log("session user", session.user);
  console.log("req body", req.body);

  switch (req.method) {
    case "POST":
      try {
        const user = await prisma.user.findUnique({
          where: { email: session.user?.email },
        });
        if (user === null) {
          return res
            .status(401)
            .json({ message: "This account no longer exists." });
        }

        const company = await prisma.company.findUnique({
          where: { id: req.body.companyId },
        });
        if (company === null) {
          return res.status(403).json({ message: "No company found." });
        }

        const UserEvent = await prisma.userEvent.create({
          data: {
            createdAt: new Date(req.body.createdAt),
            user: {
              connect: { id: user.id },
            },
            company: {
              connect: { id: company.id },
            },
          },
        });
        return res.status(200).json(UserEvent);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    case "GET":
      try {
        const ViewedHistory = await prisma.userEvent.findMany();
        return res.status(200).json(ViewedHistory);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }
    default:
      return res.status(405).json({ message: "method not supported" });
  }
}
