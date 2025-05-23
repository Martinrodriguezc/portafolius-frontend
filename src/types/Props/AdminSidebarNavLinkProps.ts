import { ReactNode } from "react";

export interface AdminSidebarNavLinkProps {
  to: string;
  icon: ReactNode;
  label: string;
  isActive: boolean;
} 