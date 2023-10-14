import { prisma } from "@/prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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

  if (req.method === "PATCH") {
    const { companyId } = req.query;
    const {
      name,
      indReferentNumber,
      city,
      street,
      houseNumber,
      postCode,
      website,
      category,
      tagTitle,
      tagCategory,
    } = req.body;
    console.log("req.body", req.body);
    try {
      await prisma.company.update({
        where: { id: companyId as string },
        data: {
          name: name as string,
          indReferentNumber: indReferentNumber as string,
          city: city as string,
          street: street as string,
          houseNumber: houseNumber as string,
          postCode: postCode as string,
          website: website as string,
          category: category as string,
          tags: {
            connectOrCreate: {
              where: {
                title: tagTitle as string,
              },
              create: {
                title: tagTitle as string,
                category: tagCategory as string,
              },
            },
          },
        },
      });

      console.log("PATCH /api/companies:id - Company details were updated");
      res.status(204).end();
    } catch (error) {
      res.status(500).json({
        message:
          "PATCH /api/companies/:id - An error occurred when updating company details",
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

export default handler;
