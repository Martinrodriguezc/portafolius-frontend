import React from "react";
import { Link, useLocation } from "react-router-dom";
import { isActivePath } from "./utils/studentSidebarUtils";

interface StudentSidebarNavLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
}

export const StudentSidebarNavLink: React.FC<StudentSidebarNavLinkProps> = ({
  to,
  icon,
  label,
}) => {
  const location = useLocation();
  const active = isActivePath(location.pathname, to);

  return (
    <li>
      <Link
        to={to}
        className={`flex items-center px-4 py-2 rounded-md transition-colors duration-200 ${
          active
            ? "bg-white text-[#4E81BD]"
            : "text-[#333333] hover:bg-white/50"
        }`}
      >
        <span className="mr-3 h-5 w-5">{icon}</span>
        {label}
      </Link>
    </li>
  );
};
