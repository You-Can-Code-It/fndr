import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NavBar from "@/components/NavBar/NavBar";
import styles from "./UserDashboard.module.css";
import { UserEvent } from "@prisma/client";
import Card from "@/components/card/Card";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function serialize(data: any) {
  return JSON.parse(JSON.stringify(data));
}
type Company = {
  id: string;
  name: string;
  activity: string;
  indReferentNumber: string;
  website: string;
  category: string;
  city: string;
  street: string;
  houseNumber: string;
  postCode: string;
  display: boolean;
};

type UserEventsByCompanyId = Record<string, UserEvent[]>;

function UserDashBoard({
  // Keep it by now
  userEvents,
  companiesData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <NavBar />
      <div className={styles.mainCardContainer}>
        {companiesData?.map((company: Company) => {
          return (
            <Card
              key={company.id}
              id={company.id}
              name={company.name}
              city={company.city}
              website={company.website}
              display={company.display}
              category={company.category}
              // userEvent={company.userEvent[0] ?? null}
              userEvent={null}
            />
          );
        })}
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps<{
  userEvents: UserEvent[];
  companiesData: Company[];
}> = async (context) => {
  try {
    const userEmail = context.params?.userEmail as string;

    const user = await prisma.user.findUnique({
      where: {
        email: userEmail,
      },
    });

    const userEvents = await prisma.userEvent.findMany({
      where: {
        userId: user.id,
      },
    });

    // Fetch companiesData
    const companyIds = userEvents.map(
      (userEvent: UserEvent) => userEvent.companyId
    );

    const companiesData = await prisma.company.findMany({
      where: {
        id: {
          in: companyIds,
        },
      },
    });

    // Group userEvents by companyId
    const userEventsByCompanyId: UserEventsByCompanyId = userEvents.reduce(
      (acc: any, userEvent: UserEvent) => {
        if (!acc[userEvent.companyId]) {
          acc[userEvent.companyId] = [];
        }
        acc[userEvent.companyId].push(userEvent);
        return acc;
      },
      {}
    );

    // Find the most recent userEvent for each company
    const mostRecentUserEvents = Object.values(userEventsByCompanyId).map(
      (events: UserEvent[] | unknown) =>
        (events as UserEvent[]).reduce(
          (mostRecent: UserEvent | null, event: UserEvent) => {
            if (!mostRecent || event.createdAt > mostRecent.createdAt) {
              return event;
            }
            return mostRecent;
          },
          null as UserEvent | null
        )
    );

    // Sort companiesData based on mostRecentUserEvents in descending order
    const sortedCompaniesData = companiesData.slice().sort((a: any, b: any) => {
      const eventA = mostRecentUserEvents.find(
        (event) => event?.companyId === a.id
      );
      const eventB = mostRecentUserEvents.find(
        (event) => event?.companyId === b.id
      );

      const dateA = eventA?.createdAt || new Date(0);
      const dateB = eventB?.createdAt || new Date(0);

      return dateB.getTime() - dateA.getTime(); // Compare dates as timestamps
    });

    return {
      props: {
        userEvents: serialize(userEvents),
        companiesData: serialize(sortedCompaniesData),
      },
    };
  } catch (error) {
    console.error(
      "Pages /dashboard/:userId - Error fetching company data:",
      error
    );

    return {
      props: {
        userEvents: null,
        companiesData: null,
      },
    };
  }
};

export default UserDashBoard;

// Old version of the page, not sorting the most recents
// export const getServerSideProps: GetServerSideProps<{
//   userEvents: UserEvent[];
//   companiesData: Company[];
// }> = async (context) => {
//   try {
//     const userEmail = context.params?.userEmail as string;

//     const user = await prisma.user.findUnique({
//       where: {
//         email: userEmail,
//       },
//     });
//     const userEvents = await prisma.userEvent.findMany({
//       where: {
//         userId: user.id,
//       },
//     });

//     const companyIds = userEvents.map((userEvent: any) => userEvent.companyId);

//     const companiesData = await prisma.company.findMany({
//       where: {
//         id: {
//           in: companyIds,
//         },
//         // orderBy: {
//         //   userEvent: {
//         //     createdAt: "desc",
//         //   },
//         // },
//       },
//     });

//     return {
//       props: {
//         userEvents: serialize(userEvents),
//         companiesData: serialize(companiesData),
//       },
//     };
//   } catch (error) {
//     console.error(
//       "Pages /dashboard/:userId - Error fetching company data:",
//       error
//     );

//     return {
//       props: {
//         userEvents: null,
//         companiesData: null,
//       },
//     };
//   }
// };
// export default UserDashBoard;
