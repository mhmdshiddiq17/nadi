"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { LucideIcon } from "lucide-react";

import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type { AppRoleCode } from "@/features/auth/roles";
import { cn } from "@/lib/utils";

type AppSidebarProps = {
  roleCode?: string | null;
  className?: string;
};

type SidebarItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export function AppSidebar({ roleCode, className }: AppSidebarProps) {
  const visibleItems = navigation.filter((item) =>
    item.roles.includes(roleCode as AppRoleCode),
  );

  const adminItem = visibleItems.find((item) => item.href === "/admin");
  const mainItems = visibleItems.filter((item) => item.href !== "/admin");

  return (
    <aside
      className={cn(
        "hidden w-60 shrink-0 flex-col border-r border-hairline bg-sidebar lg:flex",
        className,
      )}
    >
      <div className="flex h-14 shrink-0 items-center gap-2 border-b border-hairline px-4">
        <span className="flex size-6 items-center justify-center rounded-pills bg-emerald-pulse text-[11px] font-semibold text-white">
          N
        </span>
        <Link
          href="/dashboard"
          className="font-heading text-sm font-semibold tracking-tight text-forest-ink"
        >
          {siteConfig.name}
        </Link>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {mainItems.map((item) => (
          <SidebarLink key={item.href} item={item} />
        ))}
        {adminItem ? (
          <>
            <SidebarSectionLabel>Administrasi</SidebarSectionLabel>
            <SidebarLink key={adminItem.href} item={adminItem} />
          </>
        ) : null}
      </nav>
    </aside>
  );
}

function SidebarLink({ item }: { item: SidebarItem }) {
  const pathname = usePathname();
  const active = pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-2.5 rounded-pills px-3.5 py-2 text-sm font-medium text-graphite transition-colors hover:bg-muted hover:text-forest-ink",
        active && "bg-mint-mist text-pine hover:bg-mint-mist hover:text-pine"
      )}
    >
      <item.icon className="size-4" />
      {item.label}
    </Link>
  );
}

function SidebarSectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-4 px-3.5 pb-1 text-[11px] font-medium uppercase tracking-wider text-graphite">
      {children}
    </p>
  );
}
