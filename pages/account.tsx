import React from "react";
import Link from "next/link";
import { DateTime } from "luxon";
import CompanyButton from "@/components/CompanyButton/CompanyButton";

export default function account() {
  async function handleClick(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    try {
      const date = DateTime.utc().toISO();

      const companyId = event.currentTarget.getAttribute("data-company-id");
      const response = await fetch("/api/history", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ createdAt: date, companyId: companyId }),
      });

      if (response.ok) {
        console.log("Account Page. Succesful API request.");
      } else {
        console.log("API request failed:");
      }
    } catch (error) {
      console.log("Account page error:", error);
    }
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
