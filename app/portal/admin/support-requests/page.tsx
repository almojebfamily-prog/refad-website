import { getAllSupportRequests } from "@/lib/data/support-requests";
import { SupportRequestRow } from "@/components/admin/SupportRequestRow";
import { EmptyState } from "@/components/shared/EmptyState";

export default async function AdminSupportRequestsPage() {
  const requests = await getAllSupportRequests().catch(() => null);

  return (
    <div className="space-y-3">
      {requests === null && (
        <EmptyState message="تعذر تحميل الطلبات. تأكد من إعداد الاتصال بقاعدة البيانات." />
      )}
      {requests?.length === 0 && <EmptyState message="لا توجد طلبات دعم بعد." />}
      {requests?.map((request) => (
        <SupportRequestRow key={request.id} request={request} />
      ))}
    </div>
  );
}
