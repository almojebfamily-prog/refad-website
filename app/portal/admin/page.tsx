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
        { label: "إجمالي الأعضاء", value: counts.members },
        { label: "طلبات دعم قيد المراجعة", value: counts.pendingRequests },
        { label: "رسائل تواصل جديدة", value: counts.newMessages },
        { label: "اشتراكات نشطة", value: counts.activeSubscriptions },
      ]
    : [];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stats.length === 0 ? (
        <p className="text-sm text-neutral-600">
          تعذر تحميل الإحصائيات. تأكد من إعداد الاتصال بقاعدة البيانات.
        </p>
      ) : (
        stats.map((stat) => (
          <Card key={stat.label}>
            <p className="text-3xl font-extrabold text-primary-800">{stat.value}</p>
            <p className="mt-1 text-sm text-neutral-600">{stat.label}</p>
          </Card>
        ))
      )}
    </div>
  );
}
