import { prisma } from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const { companyId, tagId } = req.query;

    try {
      console.log("api/companyId/tags");
      const updatedCompany = await prisma.company.update({
        where: { id: companyId as string },
        data: {
          tags: {
            disconnect: { id: tagId as string },
          },
        },
      });

      res.status(200).json(updatedCompany);
      console.log("tag removed");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to remove the association." });
    }
  } else {
    res.status(405).end();
  }
}
