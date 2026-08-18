import { MobileSidebar } from "@/components/layout/mobile-sidebar";
import { UserMenu } from "@/components/layout/user-menu";
import { ThemeToggle } from "@/components/theme/theme-toggle";

type AppHeaderProps = {
  userEmail?: string | null;
  fullName?: string | null;
  roleCode?: string | null;
};

export function AppHeader({
  userEmail,
  fullName,
  roleCode,
}: AppHeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 border-b border-hairline bg-background px-4">
      <MobileSidebar roleCode={roleCode} />
      <div className="flex-1" />
      <ThemeToggle />
      <UserMenu email={userEmail} name={fullName} roleCode={roleCode} />
    </header>
  );
}
