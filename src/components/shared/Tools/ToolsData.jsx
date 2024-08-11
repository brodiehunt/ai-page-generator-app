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

export const docsTools = [
  {
    title: "Getting Started",
    icon: MdLink,
    text: "Learn about what you need to get started using Atria.",
    link: {
      href: "/docs/getting-started/",
      text: "Learn",
    },
  },
  {
    title: "Spoke Generator",
    icon: MdSpoke,
    text: "Learn how to use the spoke generator to generate single spokes for your existing hub-spoke models",
    link: {
      href: "/docs/spoke-generator",
      text: "Learn",
    },
  },
  {
    title: "Hub Generator",
    icon: MdHub,
    text: "Learn how to use the Hub generator to generate single hub pages.",
    link: {
      href: "/docs/hub-generator",
      text: "Learn",
    },
  },
  {
    title: "All in One Generator",
    icon: PiSpinnerBallDuotone,
    text: "Learn how to use the All in one generator to generate content en masse",
    link: {
      href: "/docs/all-in-one-generator",
      text: "Learn",
    },
  },

  {
    title: "Longtail Generator",
    icon: MdLink,
    text: "Learn how to use the longtail generator to formulate ideas for you blogs.",
    link: {
      href: "/docs/longtail-generator",
      text: "Learn",
    },
  },
];

export const nextSteps = [
  {
    title: "Spoke Generator",
    icon: MdSpoke,
    text: "Learn how to use the spoke generator to generate single spokes for your existing hub-spoke models",
    link: {
      href: "/docs/spoke-generator",
      text: "Learn",
    },
  },
  {
    title: "Hub Generator",
    icon: MdHub,
    text: "Learn how to use the Hub generator to generate single hub pages.",
    link: {
      href: "/docs/hub-generator",
      text: "Learn",
    },
  },
  {
    title: "All in One Generator",
    icon: PiSpinnerBallDuotone,
    text: "Learn how to use the All in one generator to generate content en masse",
    link: {
      href: "/docs/all-in-one-generator",
      text: "Learn",
    },
  },
];
