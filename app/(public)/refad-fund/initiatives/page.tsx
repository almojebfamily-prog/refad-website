import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { FundSubNav } from "@/components/refad-fund/FundSubNav";
import { EmptyState } from "@/components/shared/EmptyState";
import { getInitiativeTypes } from "@/lib/data/initiative-types";
import { getInitiatives } from "@/lib/data/initiatives";
import { Sprout } from "lucide-react";

export default async function InitiativesPage() {
  const [types, initiatives] = await Promise.all([
    getInitiativeTypes().catch(() => null),
    getInitiatives().catch(() => null),
  ]);

  return (
    <>
      <PageHeader eyebrow="صندوق رفاد" title="المبادرات" />
      <FundSubNav />

      <Section>
        {(types === null || initiatives === null) && (
          <EmptyState message="تعذر تحميل المبادرات. تأكد من إعداد الاتصال بقاعدة البيانات." />
        )}
        {types?.length === 0 && <EmptyState message="لم تتم إضافة مبادرات بعد." />}
        {types && initiatives && types.length > 0 && (
          <div className="space-y-10">
            {types.map((type) => {
              const items = initiatives.filter((i) => i.initiative_type_id === type.id);
              return (
                <div key={type.id}>
                  <h2 className="mb-4 text-xl font-bold text-primary-900">{type.title}</h2>
                  {items.length === 0 ? (
                    <p className="text-sm text-neutral-500">لا توجد خدمات فرعية بعد.</p>
                  ) : (
                    <div className="grid gap-6 sm:grid-cols-2">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
                        >
                          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary-50 text-primary-700">
                            <Sprout className="h-6 w-6" />
                          </div>
                          <h3 className="text-lg font-bold text-primary-900">{item.title}</h3>
                          <p className="mt-2 text-sm text-neutral-600">{item.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </>
  );
}
