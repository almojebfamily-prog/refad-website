"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const groups = [
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

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 shrink-0 space-y-6">
      {groups.map((group) => (
        <div key={group.title}>
          {group.href ? (
            <Link
              href={group.href}
              className={cn(
                "block px-3 pb-1.5 text-xs font-semibold transition-colors",
                pathname === group.href
                  ? "text-primary-700"
                  : "text-neutral-500 hover:text-primary-700"
              )}
            >
              {group.title}
            </Link>
          ) : (
            <p className="px-3 pb-1.5 text-xs font-semibold text-neutral-500">
              {group.title}
            </p>
          )}
          <nav className="space-y-1">
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
          </nav>
        </div>
      ))}
    </aside>
  );
}
