import Link from "next/link";
import { requireAdmin } from "@/lib/auth";

const adminLinks = [
  { href: "/portal/admin", label: "نظرة عامة" },
  { href: "/portal/admin/board", label: "مجلس الأمناء" },
  { href: "/portal/admin/initiative-types", label: "أنواع المبادرات" },
  { href: "/portal/admin/initiatives", label: "الخدمات الفرعية للمبادرات" },
  { href: "/portal/admin/reports", label: "التقارير" },
  { href: "/portal/admin/family-members", label: "شجرة العائلة" },
  { href: "/portal/admin/members", label: "الأعضاء" },
  { href: "/portal/admin/support-requests", label: "طلبات الدعم" },
  { href: "/portal/admin/messages", label: "رسائل التواصل" },
  { href: "/portal/admin/media/family-news", label: "أخبار العائلة" },
  { href: "/portal/admin/media/fund-news", label: "أخبار الصندوق" },
  { href: "/portal/admin/media/videos", label: "مكتبة الفيديو" },
  { href: "/portal/admin/media/magazine", label: "مجلة العائلة" },
];

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary-900">لوحة الإدارة</h1>
        <p className="mt-1 text-sm text-neutral-600">
          إدارة محتوى الموقع وبيانات العائلة والصندوق.
        </p>
      </div>

      <nav className="flex flex-wrap gap-2 border-b border-neutral-200 pb-3">
        {adminLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="rounded-full px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {children}
    </div>
  );
}
