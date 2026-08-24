import { getAllProfiles } from "@/lib/data/members";
import { MemberForm } from "@/components/admin/MemberForm";
import { MemberRow } from "@/components/admin/MemberRow";
import { EmptyState } from "@/components/shared/EmptyState";

export default async function AdminMembersPage() {
  const profiles = await getAllProfiles().catch(() => null);

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-neutral-200 bg-white p-4">
        <h2 className="mb-3 text-sm font-semibold text-neutral-700">إنشاء حساب عضو جديد</h2>
        <MemberForm />
      </div>

      <div className="space-y-3">
        {profiles === null && (
          <EmptyState message="تعذر تحميل البيانات. تأكد من إعداد الاتصال بقاعدة البيانات." />
        )}
        {profiles?.length === 0 && <EmptyState message="لا يوجد أعضاء مسجلون بعد." />}
        {profiles?.map((profile) => (
          <MemberRow key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
}
