import { ReactNode } from "react";
export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`bg-card border border-br rounded-card p-5 ${className}`}>{children}</div>;
}
