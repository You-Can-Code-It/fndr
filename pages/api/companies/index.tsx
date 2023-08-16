import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    //console.log("/api/companies, req.body", req.body);
    try {
      const {
        name,
        indReferentNumber,
        website,
        category,
        city,
        street,
        houseNumber,
        postCode,
      } = req.body;

      if (
        !name ||
        !indReferentNumber ||
        !website ||
        !category ||
        !category ||
        !city ||
        !street ||
        !houseNumber ||
        !postCode
      ) {
        console.log("Create company error: all info must be presented.");
        return;
      }

      const createdCompany = await prisma.company.create({
        data: {
          name,
          indReferentNumber,
          website,
          category,
          city,
          street,
          houseNumber,
          postCode,
        },
      });

      res.status(201).json(createdCompany);
    } catch (error) {
      res.status(500).json({ message: "An error occurred." });
    }
  } else {
    res
      .status(405)
      .json({ message: "Method not allowed. Company not created" });
  }
};
