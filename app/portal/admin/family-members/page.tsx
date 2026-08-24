import { getFamilyMembers } from "@/lib/data/family-tree";
import { FamilyMemberForm } from "@/components/admin/FamilyMemberForm";
import { FamilyMemberRow } from "@/components/admin/FamilyMemberRow";
import { EmptyState } from "@/components/shared/EmptyState";

export default async function AdminFamilyMembersPage() {
  const members = await getFamilyMembers().catch(() => null);

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-neutral-200 bg-white p-4">
        <h2 className="mb-3 text-sm font-semibold text-neutral-700">إضافة فرد جديد</h2>
        <FamilyMemberForm allMembers={members ?? []} />
      </div>

      <div className="space-y-3">
        {members === null && (
          <EmptyState message="تعذر تحميل البيانات. تأكد من إعداد الاتصال بقاعدة البيانات." />
        )}
        {members?.length === 0 && <EmptyState message="لم تتم إضافة أفراد بعد." />}
        {members?.map((member) => (
          <FamilyMemberRow key={member.id} member={member} allMembers={members} />
        ))}
      </div>
    </div>
  );
}
