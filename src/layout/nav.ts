import type React from "react";

export type NavItem = {
  name: string;
  icon?: React.ReactNode;
  path?: string;
  subItems?: { name: string; path: string; pro?: boolean; new?: boolean }[];
};

export const mainNavItems: NavItem[] = [
  {
    name: "Dashboard",
    subItems: [{ name: "Ecommerce", path: "/ecommerce", pro: false }],
  },
  {
    name: "Calendar",
    path: "/calendar",
  },
  {
    name: "User Profile",
    path: "/profile",
  },
  {
    name: "Forms",
    subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
  },
  {
    name: "Tables",
    subItems: [
      { name: "Basic Tables", path: "/basic-tables", pro: false },
      { name: "Transaction view", path: "/transaction-view", pro: false },
    ],
  },
  {
    name: "Pages",
    subItems: [
      { name: "Blank Page", path: "/blank", pro: false },
      { name: "404 Error", path: "/error-404", pro: false },
    ],
  },
];

export const otherNavItems: NavItem[] = [
  {
    name: "Charts",
    subItems: [
      { name: "Line Chart", path: "/line-chart", pro: false },
      { name: "Bar Chart", path: "/bar-chart", pro: false },
    ],
  },
  {
    name: "UI Elements",
    subItems: [
      { name: "Alerts", path: "/alerts", pro: false },
      { name: "Avatar", path: "/avatars", pro: false },
      { name: "Badge", path: "/badge", pro: false },
      { name: "Buttons", path: "/buttons", pro: false },
      { name: "Images", path: "/images", pro: false },
      { name: "Videos", path: "/videos", pro: false },
    ],
  },
]; 