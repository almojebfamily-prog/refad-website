import { getInitiatives } from "@/lib/data/initiatives";
import { InitiativeForm } from "@/components/admin/InitiativeForm";
import { InitiativeRow } from "@/components/admin/InitiativeRow";
import { EmptyState } from "@/components/shared/EmptyState";

export default async function AdminInitiativesPage() {
  const initiatives = await getInitiatives().catch(() => null);

  return (
    <div className="space-y-8">
      <div className="rounded-xl border border-neutral-200 bg-white p-4">
        <h2 className="mb-3 text-sm font-semibold text-neutral-700">إضافة مبادرة جديدة</h2>
        <InitiativeForm />
      </div>

      <div className="space-y-3">
        {initiatives === null && (
          <EmptyState message="تعذر تحميل البيانات. تأكد من إعداد الاتصال بقاعدة البيانات." />
        )}
        {initiatives?.length === 0 && <EmptyState message="لا توجد مبادرات بعد." />}
        {initiatives?.map((initiative) => (
          <InitiativeRow key={initiative.id} initiative={initiative} />
        ))}
      </div>
    </div>
  );
}
