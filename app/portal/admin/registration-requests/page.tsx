import { getRegistrationRequests } from "@/lib/data/registration-requests";
import { RegistrationRequestRow } from "@/components/admin/RegistrationRequestRow";
import { EmptyState } from "@/components/shared/EmptyState";

export default async function AdminRegistrationRequestsPage() {
  const requests = await getRegistrationRequests().catch(() => null);

  return (
    <div className="space-y-3">
      {requests === null && (
        <EmptyState message="تعذر تحميل الطلبات. تأكد من إعداد الاتصال بقاعدة البيانات." />
      )}
      {requests?.length === 0 && <EmptyState message="لا توجد طلبات تسجيل بعد." />}
      {requests?.map((request) => (
        <RegistrationRequestRow key={request.id} request={request} />
      ))}
    </div>
  );
}
