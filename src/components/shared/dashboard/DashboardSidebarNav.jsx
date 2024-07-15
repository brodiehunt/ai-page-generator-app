import DashboardNavLink from "./DashboardNavLink";
import { GlobeAltIcon } from "@heroicons/react/20/solid";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { MdDashboard, MdHub, MdSpoke, MdLogout, MdLink } from "react-icons/md";
import { PiSpinnerBallDuotone } from "react-icons/pi";
import { signOut } from "@/auth";
import { redirect } from "next/navigation";
import SignOutButton from "@/src/components/shared/SignOutButton";

const navLinks = [
  {
    name: "Dashboard",
    icon: MdDashboard,
    href: "/dashboard",
    extraClass: "",
  },
  {
    name: "Websites",
    icon: GlobeAltIcon,
    href: "/dashboard/websites",
    extraClass: "",
  },
  {
    name: "All In One Generator",
    icon: PiSpinnerBallDuotone,
    href: "/dashboard/all-in-one-generator",
    extraClass: "",
  },
  {
    name: "Hub Generator",
    icon: MdHub,
    href: "/dashboard/hub-generator",
    extraClass: "",
  },
  {
    name: "Spoke Generator",
    icon: MdSpoke,
    href: "/dashboard/spoke-generator",
    extraClass: "",
  },
  {
    name: "Longtail Generator",
    icon: MdLink,
    href: "/dashboard/longtail-generator",
    extraClass: "",
  },
  {
    name: "Docs",
    icon: ClipboardDocumentListIcon,
    href: "/docs",
    extraClass: "mt-auto",
  },
];

export default function DashboardSidebarNav() {
  return (
    <nav className="p-4 px-8 flex-grow">
      <ul className="flex flex-col gap-4 h-full">
        {navLinks &&
          navLinks.map((navLink, index) => {
            const isDocs = navLink.href === "/docs";
            return (
              <li className={`h-fit ${isDocs ? "mt-auto" : ""}`} key={index}>
                <DashboardNavLink navLink={navLink} />
              </li>
            );
          })}
        <li className="h-fit" key="signout">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}
