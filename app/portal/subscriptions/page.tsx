import { requireProfile } from "@/lib/auth";
import {
  getMySubscriptions,
  subscriptionStatusLabels,
  subscriptionStatusStyles,
} from "@/lib/data/subscriptions";
import { Card } from "@/components/shared/Card";
import { EmptyState } from "@/components/shared/EmptyState";

export default async function SubscriptionsPage() {
  const profile = await requireProfile();
  const subscriptions = await getMySubscriptions(profile.id).catch(() => null);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-primary-900">الاشتراكات</h1>
        <p className="mt-1 text-sm text-neutral-600">
          تابع حالة اشتراكك في صندوق رفاد العائلي.
        </p>
      </div>

      {subscriptions === null && (
        <EmptyState message="تعذر تحميل بيانات الاشتراك. تأكد من إعداد الاتصال بقاعدة البيانات." />
      )}
      {subscriptions?.length === 0 && (
        <EmptyState message="لا يوجد لديك اشتراكات مسجلة بعد." />
      )}
      {subscriptions && subscriptions.length > 0 && (
        <div className="space-y-3">
          {subscriptions.map((sub) => (
            <Card key={sub.id} className="flex items-center justify-between">
              <div>
                <p className="font-bold text-primary-900">{sub.plan_name}</p>
                <p className="mt-1 text-sm text-neutral-600">
                  {sub.amount} ر.س — يبدأ في {sub.start_date}
                  {sub.end_date ? ` وينتهي في ${sub.end_date}` : ""}
                </p>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${subscriptionStatusStyles[sub.status]}`}
              >
                {subscriptionStatusLabels[sub.status]}
              </span>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
