import Link from "next/link";
import { sql } from "@/lib/db";
import { Card } from "@/components/shared/Card";

async function getCounts() {
  const [[members], [requests], [messages], [subscriptions]] = await Promise.all([
    sql`SELECT COUNT(*)::int AS count FROM profiles`,
    sql`SELECT COUNT(*)::int AS count FROM support_requests WHERE status = 'pending'`,
    sql`SELECT COUNT(*)::int AS count FROM contact_messages WHERE status = 'new'`,
    sql`SELECT COUNT(*)::int AS count FROM subscriptions WHERE status = 'active'`,
  ]) as { count: number }[][];

  return {
    members: members.count,
    pendingRequests: requests.count,
    newMessages: messages.count,
    activeSubscriptions: subscriptions.count,
  };
}

export default async function AdminOverviewPage() {
  const counts = await getCounts().catch(() => null);

  const stats = counts
    ? [
        { label: "إجمالي الأعضاء", value: counts.members, href: "/portal/admin/members" },
        {
          label: "طلبات دعم قيد المراجعة",
          value: counts.pendingRequests,
          href: "/portal/admin/support-requests",
        },
        {
          label: "رسائل تواصل جديدة",
          value: counts.newMessages,
          href: "/portal/admin/messages",
        },
        { label: "اشتراكات نشطة", value: counts.activeSubscriptions, href: null },
      ]
    : [];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.length === 0 ? (
        <p className="text-sm text-neutral-600">
          تعذر تحميل الإحصائيات. تأكد من إعداد الاتصال بقاعدة البيانات.
        </p>
      ) : (
        stats.map((stat) => {
          const content = (
            <Card className="h-full transition-shadow hover:shadow-md">
              <p className="text-3xl font-extrabold text-primary-800">{stat.value}</p>
              <p className="mt-1 text-sm text-neutral-600">{stat.label}</p>
            </Card>
          );
          return stat.href ? (
            <Link key={stat.label} href={stat.href}>
              {content}
            </Link>
          ) : (
            <div key={stat.label}>{content}</div>
          );
        })
      )}
    </div>
  );
}
