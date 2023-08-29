import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { companyId } = req.query;
  if (req.method === "PUT") {
    const { companyId } = req.query;
    try {
      await prisma.company.update({
        where: { id: companyId as string },
        data: { display: false },
      });
      console.log(
        "PUT /api/companies:id - Company `display` field updated to false."
      );
      res.status(204).end();
    } catch (error) {
      res.status(500).json({
        message:
          "PUT /api/companies/:id - An error occurred when updating `display` field.",
        error,
      });
    }
  }

  //Keeping the original "DELETE" method so it can eventually be used in a new feature
  if (req.method === "DELETE") {
    try {
      await prisma.company.delete({
        where: {
          id: companyId as string,
        },
      });
      res.status(204).end();
    } catch (error) {
      res.status(500).json({
        message: "DELETE /api/companies/:id - An error occurred.",
        error,
      });
    }
  } else {
    res
      .status(405)
      .json({ message: "/api/companies/:id - Method not allowed." });
  }
};
