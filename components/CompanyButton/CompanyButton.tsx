//Code refactor needed for deployment version
import React, { ReactNode, ButtonHTMLAttributes } from "react";

interface CompanyButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function CompanyButton({
  children,
  ...props
}: CompanyButtonProps) {
  return <button {...props}>{children}</button>;
}
