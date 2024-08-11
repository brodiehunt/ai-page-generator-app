import DashboardNavLink from "@/src/components/shared/dashboard/DashboardNavLink";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { MdDashboard, MdHub, MdSpoke, MdLogout, MdLink } from "react-icons/md";
import { PiSpinnerBallDuotone } from "react-icons/pi";
import SignOutButton from "@/src/components/shared/SignOutButton";
import { TbHandClick } from "react-icons/tb";

const navLinks = [
  {
    name: "Getting Started",
    icon: TbHandClick,
    href: "/docs/getting-started",
    extraClass: "",
  },
  {
    name: "Learn All In One Generator",
    icon: PiSpinnerBallDuotone,
    href: "/docs/all-in-one-generator",
    extraClass: "",
  },
  {
    name: "Learn Hub Generator",
    icon: MdHub,
    href: "/docs/hub-generator",
    extraClass: "",
  },
  {
    name: "Learn Spoke Generator",
    icon: MdSpoke,
    href: "/docs/spoke-generator",
    extraClass: "",
  },
  {
    name: "Learn Longtail Generator",
    icon: MdLink,
    href: "/docs/longtail-generator",
    extraClass: "",
  },
];

export default function DocsSidebarNav() {
  return (
    <nav className="p-4 px-8 flex-grow">
      <ul className="flex flex-col gap-4 h-full">
        {navLinks &&
          navLinks.map((navLink, index) => {
            return (
              <li className="h-fit" key={index}>
                <DashboardNavLink navLink={navLink} />
              </li>
            );
          })}
        <li className="h-fit mt-auto">
          <DashboardNavLink
            navLink={{
              name: "Dashboard",
              icon: MdDashboard,
              href: "/dashboard",
              extraClass: "",
            }}
          />
        </li>
        <li className="h-fit" key="signout">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}
