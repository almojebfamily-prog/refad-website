"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GitBranch,
  LayoutDashboard,
  LogOut,
  Settings,
  ShieldCheck,
  User,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/actions/auth";

const links = [
  { href: "/portal", label: "لوحة التحكم", icon: LayoutDashboard, exact: true },
  { href: "/portal/profile", label: "الملف الشخصي", icon: User },
  { href: "/portal/family-tree", label: "شجرة العائلة", icon: GitBranch },
  { href: "/portal/services", label: "الخدمات", icon: Settings },
  { href: "/portal/subscriptions", label: "الاشتراكات", icon: Wallet },
];

export function Sidebar({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-e border-neutral-200 bg-white">
      <Link href="/" className="flex items-center gap-2 border-b border-neutral-200 px-6 py-5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-700 text-sm font-bold text-white">
          ر
        </span>
        <span className="text-sm font-bold text-primary-900">صندوق رفاد</span>
      </Link>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {links.map((link) => {
          const active = link.exact
            ? pathname === link.href
            : pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-primary-50 text-primary-800"
                  : "text-neutral-700 hover:bg-neutral-100"
              )}
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </Link>
          );
        })}

        {isAdmin && (
          <>
            <p className="px-3 pt-4 pb-1 text-xs font-semibold text-neutral-500">
              الإدارة
            </p>
            <Link
              href="/portal/admin"
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                pathname.startsWith("/portal/admin")
                  ? "bg-primary-50 text-primary-800"
                  : "text-neutral-700 hover:bg-neutral-100"
              )}
            >
              <ShieldCheck className="h-5 w-5" />
              لوحة الإدارة
            </Link>
          </>
        )}
      </nav>

      <form action={logout} className="border-t border-neutral-200 p-3">
        <button
          type="submit"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
        >
          <LogOut className="h-5 w-5" />
          تسجيل الخروج
        </button>
      </form>
    </aside>
  );
}
