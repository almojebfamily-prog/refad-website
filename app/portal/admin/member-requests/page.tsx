import { getAllMemberRequests } from "@/lib/data/member-requests";
import { MemberRequestRow } from "@/components/admin/MemberRequestRow";
import { EmptyState } from "@/components/shared/EmptyState";

export default async function AdminMemberRequestsPage() {
  const requests = await getAllMemberRequests().catch(() => null);

  return (
    <div className="space-y-3">
      {requests === null && (
        <EmptyState message="تعذر تحميل الطلبات. تأكد من إعداد الاتصال بقاعدة البيانات." />
      )}
      {requests?.length === 0 && <EmptyState message="لا توجد طلبات أعضاء بعد." />}
      {requests?.map((request) => (
        <MemberRequestRow key={request.id} request={request} />
      ))}
    </div>
  );
}
