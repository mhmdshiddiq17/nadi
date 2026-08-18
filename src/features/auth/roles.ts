export const APP_ROLES = [
  "UNASSIGNED",
  "SUPER_ADMIN",
  "APN_ADMIN",
  "APN_ANALYST",
  "KL_VIEWER",
  "AUDITOR",
  "EXECUTIVE",
] as const;

export type AppRoleCode =
  (typeof APP_ROLES)[number];

export const ADMIN_ROLES:
  readonly AppRoleCode[] = [
    "SUPER_ADMIN",
    "APN_ADMIN",
  ];