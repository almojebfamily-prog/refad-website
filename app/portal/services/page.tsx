import { requireProfile } from "@/lib/auth";
import { getInitiatives, initiativeCategoryLabels } from "@/lib/data/initiatives";
import {
  getMySupportRequests,
  supportRequestStatusLabels,
  supportRequestStatusStyles,
} from "@/lib/data/support-requests";
import { SupportRequestForm } from "@/components/portal/SupportRequestForm";
import { Card } from "@/components/shared/Card";
import { EmptyState } from "@/components/shared/EmptyState";

export default async function ServicesPage() {
  const profile = await requireProfile();
  const [initiatives, myRequests] = await Promise.all([
    getInitiatives().catch(() => []),
    getMySupportRequests(profile.id).catch(() => null),
  ]);

  const initiativeTitleById = new Map(initiatives.map((i) => [i.id, i.title]));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-primary-900">الخدمات</h1>
        <p className="mt-1 text-sm text-neutral-600">
          تصفح مبادرات الصندوق وقدّم طلب دعم عند الحاجة.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        {initiatives.map((initiative) => (
          <Card key={initiative.id}>
            <p className="mb-1 text-xs font-semibold text-gold-600">
              {initiativeCategoryLabels[initiative.category]}
            </p>
            <h3 className="font-bold text-primary-900">{initiative.title}</h3>
            <p className="mt-1 text-sm text-neutral-600">{initiative.description}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="mb-4 text-lg font-bold text-primary-900">تقديم طلب دعم</h2>
          {initiatives.length > 0 ? (
            <SupportRequestForm initiatives={initiatives} />
          ) : (
            <EmptyState message="لا توجد خدمات متاحة حاليًا لتقديم الطلبات." />
          )}
        </div>

        <div>
          <h2 className="mb-4 text-lg font-bold text-primary-900">طلباتي السابقة</h2>
          {myRequests === null && (
            <EmptyState message="تعذر تحميل طلباتك السابقة." />
          )}
          {myRequests?.length === 0 && (
            <EmptyState message="لم تقم بتقديم أي طلبات بعد." />
          )}
          {myRequests && myRequests.length > 0 && (
            <div className="space-y-3">
              {myRequests.map((request) => (
                <Card key={request.id}>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-primary-900">
                      {(request.initiative_id &&
                        initiativeTitleById.get(request.initiative_id)) ??
                        "خدمة"}
                    </p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${supportRequestStatusStyles[request.status]}`}
                    >
                      {supportRequestStatusLabels[request.status]}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-neutral-600">{request.description}</p>
                  {request.admin_comment && (
                    <p
                      className={`mt-3 rounded-lg p-3 text-sm ${
                        request.status === "rejected"
                          ? "bg-red-50 text-red-700"
                          : "bg-neutral-50 text-neutral-700"
                      }`}
                    >
                      <span className="font-semibold">ملاحظة الإدارة: </span>
                      {request.admin_comment}
                    </p>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
