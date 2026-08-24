import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/shared/Card";

async function getCounts() {
  const supabase = await createClient();
  const [members, requests, messages, subscriptions] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase
      .from("support_requests")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase
      .from("contact_messages")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("subscriptions")
      .select("id", { count: "exact", head: true })
      .eq("status", "active"),
  ]);

  return {
    members: members.count ?? 0,
    pendingRequests: requests.count ?? 0,
    newMessages: messages.count ?? 0,
    activeSubscriptions: subscriptions.count ?? 0,
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
