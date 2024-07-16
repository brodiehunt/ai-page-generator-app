import { MdDashboard, MdHub, MdSpoke, MdLogout, MdLink } from "react-icons/md";
import { PiSpinnerBallDuotone } from "react-icons/pi";
import { GlobeAltIcon } from "@heroicons/react/20/solid";
import { ClipboardDocumentListIcon } from "@heroicons/react/24/solid";
import { TbSeo } from "react-icons/tb";
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

export const websiteTools = [
  {
    title: "Learn More",
    icon: ClipboardDocumentListIcon,
    text: "Learn what you can achieve from the website dashboard page",
    link: {
      href: "/",
      text: "Go to Docs",
    },
  },
  {
    title: "Modify Your Matrix!",
    icon: TbSeo,
    text: "Your SEO matrix is the driving force behind AI content creation.",
    link: {
      href: "/dashboard/websites/websiteId/seoMatrix",
      text: "Go to Matrix page",
    },
  },
  {
    title: "Hubs Page",
    icon: MdHub,
    text: "View, Generate and control your hubs.",
    link: {
      href: "/dashboard/websites/websiteId/hubs",
      text: "Go to Hubs page",
    },
  },
  {
    title: "Spokes Page",
    icon: MdSpoke,
    text: "View, Generate and control your spokes.",
    link: {
      href: "/dashboard/websites/websiteId/spokes",
      text: "Go to spokes page",
    },
  },
];
