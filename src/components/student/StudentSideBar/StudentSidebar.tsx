import { StudentSidebarHeader } from "./StudentSidebarHeader";
import { StudentSidebarNavLink } from "./StudentSidebarNavLink";
import { StudentSidebarFooter } from "./StudentSidebarFooter";
import { studentMenuItems } from "./utils/studentSidebarUtils";

export default function StudentSidebar() {
  return (
    <aside className="w-64 bg-[#F4F4F4] h-screen flex flex-col">
      <StudentSidebarHeader />
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {studentMenuItems.map((item) => (
            <StudentSidebarNavLink
              key={item.path}
              to={item.path}
              icon={<item.icon className="h-5 w-5" />}
              label={item.label}
            />
          ))}
        </ul>
      </nav>
      <StudentSidebarFooter />
    </aside>
  );
}