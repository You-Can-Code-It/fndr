import React from "react";
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { getServerSession } from "next-auth";

export default function account() {
  // const { data: session } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (session === null) {
  //     router.push("/");
  //   }
  // }, [session]);

  return (
    <div>
      <Link href="/">Go back</Link>
      <h1>THIS IS AN ACCOUNT PAGE</h1>
    </div>
  );
}

// export async function getServerSideProps() {
//   const session = await getServerSession();
//   if (session === null) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }
//   return { props: {} };
// }
