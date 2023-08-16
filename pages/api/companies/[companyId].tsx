import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { companyId } = req.query;

  if (req.method === "DELETE") {
    try {
      await prisma.company.delete({
        where: {
          id: companyId as string,
        },
      });
      res.status(204).end();
    } catch (error) {
      res
        .status(500)
        .json({ message: "/api/companies/:id An error occurred.", error });
    }
  }
  if (req.method === "PUT") {
    const { companyId } = req.query;
    try {
      await prisma.company.update({
        where: { id: companyId as string },
        data: { display: false },
      });
      console.log("/api/companies:id - Company `display` field updated");
      res.status(204).end();
    } catch (error) {
      res.status(500).json({
        message:
          "/api/companies/:id An error occurred when updating `display` field.",
        error,
      });
    }
  } else {
    res
      .status(405)
      .json({ message: "/api/companies/:id, else, Method not allowed." });
  }
};
