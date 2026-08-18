"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type { AppRoleCode } from "@/features/auth/roles";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type MobileSidebarProps = {
  roleCode?: string | null;
};

type SidebarItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export function MobileSidebar({ roleCode }: MobileSidebarProps) {
  const visibleItems = navigation.filter((item) =>
    item.roles.includes(roleCode as AppRoleCode),
  );

  const adminItem = visibleItems.find((item) => item.href === "/admin");
  const mainItems = visibleItems.filter((item) => item.href !== "/admin");

  return (
    <Sheet>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Buka menu">
            <Menu className="size-4" />
          </Button>
        }
      />
      <SheetContent side="left" className="w-64 p-0">
        <SheetHeader className="flex flex-row items-center gap-2 border-b border-hairline px-4 py-3">
          <span className="flex size-6 items-center justify-center rounded-pills bg-emerald-pulse text-[11px] font-semibold text-white">
            N
          </span>
          <SheetTitle className="font-heading text-sm font-semibold tracking-tight text-forest-ink">
            {siteConfig.name}
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-3">
          {mainItems.map((item) => (
            <MobileSidebarLink key={item.href} item={item} />
          ))}
          {adminItem ? (
            <>
              <p className="mt-4 px-3.5 pb-1 text-[11px] font-medium uppercase tracking-wider text-graphite">
                Administrasi
              </p>
              <MobileSidebarLink key={adminItem.href} item={adminItem} />
            </>
          ) : null}
        </nav>
      </SheetContent>
    </Sheet>
  );
}

function MobileSidebarLink({ item }: { item: SidebarItem }) {
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
