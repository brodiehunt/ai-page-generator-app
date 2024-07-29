import { MdDashboard, MdHub, MdSpoke, MdLogout, MdLink } from "react-icons/md";
import { PiSpinnerBallDuotone } from "react-icons/pi";
import { GlobeAltIcon } from "@heroicons/react/20/solid";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { TbSeo } from "react-icons/tb";

export const dashboardTools = [
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
