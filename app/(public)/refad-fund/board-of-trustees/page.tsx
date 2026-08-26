import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { FundSubNav } from "@/components/refad-fund/FundSubNav";
import { EmptyState } from "@/components/shared/EmptyState";
import { getBoardMembers } from "@/lib/data/board";
import { MemberPhoto } from "@/components/shared/MemberPhoto";

export default async function BoardOfTrusteesPage() {
  const members = await getBoardMembers().catch(() => null);

  return (
    <>
      <PageHeader eyebrow="صندوق رفاد" title="مجلس الأمناء" />
      <FundSubNav />

      <Section>
        {members === null && (
          <EmptyState message="تعذر تحميل بيانات مجلس الأمناء. تأكد من إعداد الاتصال بقاعدة البيانات." />
        )}
        {members?.length === 0 && (
          <EmptyState message="لم تتم إضافة أعضاء مجلس الأمناء بعد." />
        )}
        {members && members.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member) => (
              <div
                key={member.id}
                className="rounded-2xl border border-neutral-200 bg-white p-6 text-center shadow-sm"
              >
                <MemberPhoto src={member.photo_url} size={80} className="mx-auto mb-4" />
                <h3 className="text-lg font-bold text-primary-900">
                  {member.full_name}
                </h3>
                <p className="mt-1 text-sm font-medium text-gold-600">
                  {member.role_title}
                </p>
                {member.bio && (
                  <p className="mt-3 text-sm text-neutral-600">{member.bio}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
