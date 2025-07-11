import React from "react";
import { Link } from "react-router-dom";
import { AdminSidebarNavLinkProps } from "../../../types/Props/AdminSidebarNavLinkProps";

export const SidebarNavLink: React.FC<AdminSidebarNavLinkProps> = ({
  to,
  icon,
  label,
  isActive,
}) => {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
          isActive
            ? "bg-sky-100 text-sky-700"
            : "text-gray-700 hover:bg-gray-100"
        }`}
      >
        <span className="mr-3">{icon}</span>
        {label}
      </Link>
    </li>
  );
}; 