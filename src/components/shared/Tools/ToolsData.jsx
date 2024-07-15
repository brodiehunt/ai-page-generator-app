import { MdDashboard, MdHub, MdSpoke, MdLogout, MdLink } from "react-icons/md";
import { PiSpinnerBallDuotone } from "react-icons/pi";
import { GlobeAltIcon } from "@heroicons/react/20/solid";
import NewWebsiteModalButton from "../WebsiteLists/NewWebsiteModalButton";
export const dashboardTools = [
  {
    title: "Get started by creating a website",
    icon: GlobeAltIcon,
    text: "Creating a website allows you to keep all your related blogs and data in one place",
    button: NewWebsiteModalButton,
    link: {
      href: "/",
      text: "Create New Website",
    },
  },
  {
    title: "Generate Longtail Blogs",
    icon: MdLink,
    text: "Get blog/spoke ideas with the Longtail generator",
    link: {
      href: "/dashboard/longtail-generator",
      text: "Create longtails here",
    },
  },
  {
    title: "Generate a Hub Page",
    icon: MdHub,
    text: "Use our Hub page generator to create Hub pages for your website",
    link: {
      href: "/dashboard/hub-generator",
      text: "Create hubs here",
    },
  },
  {
    title: "Generate a Single Spoke Page",
    icon: MdSpoke,
    text: "Use our Spoke page generator to create spoke pages for your website. ",
    link: {
      href: "/dashboard/spoke-generator",
      text: "Create spokes here",
    },
  },
];
