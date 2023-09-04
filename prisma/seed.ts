
const companiesWithCuid = require("../dataCleaning/companiesCuid.json");
//add json file companies with coordinates later
const dummyUsers = require("./seeds/users.json");
const dummyEvents = require("./seeds/userEvents.json");
const dummyAccounts = require("./seeds/accounts.json");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    // Seed data using createMany
    const companies = await prisma.company.createMany({
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

    console.log(
      `
  SEEDED: 

  Companies: ${companies.count}
  Users: ${users.count}
  Accounts: ${accounts.count}
  UserEvents: ${userEvents.count}
  `
    );

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
