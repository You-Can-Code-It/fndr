const companiesWithCuid = require("../dataCleaning/companiesCuid.json");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    // Seed data using createMany
    const seededData = await prisma.company.createMany({
      data: companiesWithCuid.map((company: any) => {
        const {
          id,
          name,
          referentNumber,
          webpageUrl,
          category,
          city,
          street,
          houseNumber,
          postCode,
        } = company;

        return {
          id,
          name,
          indReferentNumber: referentNumber,
          website: webpageUrl,
          category,
          city,
          street,
          houseNumber,
          postCode,
        };
      }),
      skipDuplicates: true, // skip duplicates
    });

    //console.log(seededData, "Seeded Data:");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
