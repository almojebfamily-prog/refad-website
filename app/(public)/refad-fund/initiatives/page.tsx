import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { FundSubNav } from "@/components/refad-fund/FundSubNav";
import { EmptyState } from "@/components/shared/EmptyState";
import { getInitiatives, initiativeCategoryLabels } from "@/lib/data/initiatives";
import { GraduationCap, HandHeart, PartyPopper, TrendingUp } from "lucide-react";
import type { InitiativeCategory } from "@/types/database.types";

const categoryIcons: Record<InitiativeCategory, React.ComponentType<{ className?: string }>> = {
  social_support: HandHeart,
  scientific_excellence: GraduationCap,
  gatherings: PartyPopper,
  investment: TrendingUp,
};

export default async function InitiativesPage() {
  const initiatives = await getInitiatives().catch(() => null);

  return (
    <>
      <PageHeader eyebrow="صندوق رفاد" title="المبادرات" />
      <FundSubNav />

      <Section>
        {initiatives === null && (
          <EmptyState message="تعذر تحميل المبادرات. تأكد من إعداد الاتصال بقاعدة البيانات." />
        )}
        {initiatives?.length === 0 && (
          <EmptyState message="لم تتم إضافة مبادرات بعد." />
        )}
        {initiatives && initiatives.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2">
            {initiatives.map((item) => {
              const Icon = categoryIcons[item.category];
              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="mb-1 text-xs font-semibold text-gold-600">
                    {initiativeCategoryLabels[item.category]}
                  </p>
                  <h3 className="text-lg font-bold text-primary-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </>
  );
}
