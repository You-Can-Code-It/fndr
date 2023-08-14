import React from "react";
import { useState } from "react";
import Link from "next/link";
import { DateTime } from "luxon";
import CompanyButton from "@/components/CompanyButton/CompanyButton";

export default function account() {
  // const [userEventCreatedAt, setUserEventCreatedAt] = useState("")
  // const [userEventUser, setUserEventUser] = useState("")

  async function handleClick(event) {
    // setUserEventCreatedAt()

    const date = DateTime.utc().toISO();

    const companyId = event.target.value;

    const response = await fetch("/api/history", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ createdAt: date, companyId: companyId }),
    });
  }

  return (
    <div>
      <Link href="/">Go back</Link>
      <h1>THIS IS AN ACCOUNT PAGE</h1>
      <CompanyButton onClick={handleClick} value={"cll6j029r00001mgcrpl71g94"}>
        Click me
      </CompanyButton>
    </div>
  );
}
