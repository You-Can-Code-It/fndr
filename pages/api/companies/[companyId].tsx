import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { companyId } = req.query;

  if (req.method === "DELETE") {
    console.log("/api/companies/${id}, req.body", req.body);
    try {
      await prisma.company.delete({
        where: {
          id: companyId as string,
        },
      });
      res.status(204).end();
      console.log("/api/companies/:id, backend companyId?", companyId);
    } catch (error) {
      res
        .status(500)
        .json({ message: "/api/companies/:id An error occurred.", error });
    }
  } else {
    res
      .status(405)
      .json({ message: "/api/companies/:id, else, Method not allowed." });
  }
};
