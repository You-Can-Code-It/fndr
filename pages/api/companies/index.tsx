import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
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
        console.log(
          "POST /api/companies - Create company error: all info must be presented."
        );
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
      console.log("POST /api/companies - Company successfully created.");
    } catch (error) {
      res
        .status(500)
        .json({ message: "POST /api/companies - An error occurred:", error });
    }
  } else {
    res.status(405).json({
      message: "/api/companies - Method not allowed",
    });
  }
};
