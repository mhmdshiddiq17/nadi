import {
  ChartNoAxesCombined,
  Database,
  LayoutDashboard,
  PackageSearch,
  Settings,
} from "lucide-react";

import type {
  AppRoleCode,
} from "@/features/auth/roles";

type NavigationItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  roles: readonly AppRoleCode[];
};

const allRoles: readonly AppRoleCode[] = [
  "SUPER_ADMIN",
  "APN_ADMIN",
  "APN_ANALYST",
  "KL_VIEWER",
  "AUDITOR",
  "EXECUTIVE",
];

export const navigation:
  readonly NavigationItem[] = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      roles: allRoles,
    },

    {
      label: "Monitoring Program",
      href: "/monitoring",
      icon: ChartNoAxesCombined,
      roles: allRoles,
    },

    {
      label: "Program",
      href: "/programs",
      icon: PackageSearch,
      roles: allRoles,
    },

    {
      label: "Data Sources",
      href: "/data-sources",
      icon: Database,
      roles: [
        "SUPER_ADMIN",
        "APN_ADMIN",
        "APN_ANALYST",
        "AUDITOR",
        "EXECUTIVE",
      ],
    },

    {
      label: "Administration",
      href: "/admin",
      icon: Settings,
      roles: [
        "SUPER_ADMIN",
        "APN_ADMIN",
      ],
    },
  ];