const companiesWithCuid = require("../dataCleaning/companiesWithCoordinates.json");
//add json file companies with coordinates later
const dummyUsers = require("./seeds/users.json");
const dummyEvents = require("./seeds/userEvents.json");
const dummyAccounts = require("./seeds/accounts.json");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    // Seed data using createMany
    for (const company of companiesWithCuid) {
      await prisma.company.upsert({
        where: {
          id: company.id,
        },
        update: {
          name: company.name,
          indReferentNumber: company.indReferentNumber,
          website: company.website,
          category: company.category,
          city: company.city,
          street: company.street,
          houseNumber: company.houseNumber,
          postCode: company.postCode,
          latitude: company.latitude,
          longitude: company.longitude,
        },
        create: {
          name: company.name,
          indReferentNumber: company.indReferentNumber,
          website: company.website,
          category: company.category,
          city: company.city,
          street: company.street,
          houseNumber: company.houseNumber,
          postCode: company.postCode,
          latitude: company.latitude,
          longitude: company.longitude,
        },
      });
    }
    // const companies = await prisma.company.createMany({
    //   data: companiesWithCuid.map((company: any) => {
    //     const {
    //       id,
    //       name,
    //       indReferentNumber,
    //       website,
    //       category,
    //       city,
    //       street,
    //       houseNumber,
    //       postCode,
    //       latitude,
    //       longitude,
    //     } = company;

    //     return {
    //       id,
    //       name,
    //       indReferentNumber,
    //       website,
    //       category,
    //       city,
    //       street,
    //       houseNumber,
    //       postCode,
    //       latitude,
    //       longitude,
    //     };
    //   }),
    //   skipDuplicates: true, // skip duplicates
    // });

    const users = await prisma.user.createMany({
      data: dummyUsers,
      skipDuplicates: true,
    });

    const accounts = await prisma.account.createMany({
      data: dummyAccounts,
      skipDuplicates: true,
    });

    const userEvents = await prisma.userEvent.createMany({
      data: dummyEvents,
      skipDuplicates: true,
    });

  //   console.log(
  //     `
  // SEEDED: 

  // Companies: ${companies.count}
  // Users: ${users.count}
  // Accounts: ${accounts.count}
  // UserEvents: ${userEvents.count}
  // `
  //   );

    if (process.env.NODE_ENV === "test") {
      // if resetting the database for a test - remove any companies and events that were added during a test
      // this means any company or event that is not in the json with seed data
      const companyIds = companiesWithCuid.map((company: any) => company.id);
      const deletedCompanies = await prisma.company.deleteMany({
        where: { id: { notIn: companyIds } },
      });

      const eventIds = dummyEvents.map((event: any) => event.id);
      const deletedEvents = await prisma.userEvent.deleteMany({
        where: { id: { notIn: eventIds } },
      });

      console.log(
        `
  DELETED: 

  Companies: ${deletedCompanies.count}
  UserEvents: ${deletedEvents.count}
  `
      );
    }
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
