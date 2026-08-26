"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GitBranch,
  LayoutDashboard,
  LogOut,
  Settings,
  User,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/actions/auth";

const links = [
  { href: "/portal", label: "لوحة التحكم", icon: LayoutDashboard, exact: true },
  { href: "/portal/profile", label: "الملف الشخصي", icon: User },
  { href: "/portal/family-tree", label: "شجرة العائلة", icon: GitBranch },
  { href: "/portal/services", label: "المبادرات", icon: Settings },
  { href: "/portal/subscriptions", label: "الاشتراكات", icon: Wallet },
];

const adminGroups = [
  {
    title: "نظرة عامة",
    href: "/portal/admin",
    items: [
      { href: "/portal/admin/board", label: "مجلس الأمناء" },
      { href: "/portal/admin/initiative-types", label: "أنواع المبادرات" },
      { href: "/portal/admin/initiatives", label: "المبادرات" },
      { href: "/portal/admin/reports", label: "التقارير" },
    ],
  },
  {
    title: "الأعضاء والشجرة",
    items: [
      { href: "/portal/admin/members", label: "الأعضاء" },
      { href: "/portal/admin/family-members", label: "شجرة العائلة" },
    ],
  },
  {
    title: "العمليات والدعم",
    items: [
      { href: "/portal/admin/tasks", label: "المهام" },
      { href: "/portal/admin/support-requests", label: "طلبات الدعم" },
      { href: "/portal/admin/messages", label: "رسائل التواصل" },
    ],
  },
  {
    title: "المركز الإعلامي والمحتوى",
    items: [
      { href: "/portal/admin/media/family-news", label: "أخبار العائلة" },
      { href: "/portal/admin/media/fund-news", label: "أخبار الصندوق" },
      { href: "/portal/admin/media/videos", label: "مكتبة الفيديو" },
      { href: "/portal/admin/media/magazine", label: "مجلة العائلة" },
    ],
  },
];

export function Sidebar({ isAdmin }: { isAdmin: boolean }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col overflow-y-auto border-e border-neutral-200 bg-white">
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
            {adminGroups.map((group) => (
              <div key={group.title} className="mt-3 first:mt-0">
                {group.href ? (
                  <Link
                    href={group.href}
                    className={cn(
                      "block px-3 pb-1 text-xs font-semibold transition-colors",
                      pathname === group.href
                        ? "text-primary-700"
                        : "text-neutral-500 hover:text-primary-700"
                    )}
                  >
                    {group.title}
                  </Link>
                ) : (
                  <p className="px-3 pb-1 text-xs font-semibold text-neutral-500">
                    {group.title}
                  </p>
                )}
                {group.items.map((item) => {
                  const active = pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "block rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        active
                          ? "bg-primary-50 text-primary-800"
                          : "text-neutral-700 hover:bg-neutral-100"
                      )}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            ))}
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
