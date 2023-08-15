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
      console.log("backend companyId?", companyId);
    } catch (error) {
      res.status(500).json({ message: "An error occurred.", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed." });
  }
};
