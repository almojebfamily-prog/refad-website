"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/refad-fund/about", label: "عن الصندوق" },
  { href: "/refad-fund/board-of-trustees", label: "مجلس الأمناء" },
  { href: "/refad-fund/initiatives", label: "المبادرات" },
  { href: "/refad-fund/reports", label: "التقارير" },
];

export function FundSubNav() {
  const pathname = usePathname();

  return (
    <div className="border-b border-neutral-200 bg-white">
      <nav className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-6">
        {tabs.map((tab) => {
          const active = pathname === tab.href;
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={cn(
                "whitespace-nowrap border-b-2 px-4 py-4 text-sm font-medium transition-colors",
                active
                  ? "border-primary-700 text-primary-800"
                  : "border-transparent text-neutral-600 hover:text-primary-700"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
