import React from "react";

export default function CompanyButton({ children, ...props }) {
  return <button {...props}>{children}</button>;
}
