import { getContactMessages } from "@/lib/data/contact-messages";
import { ContactMessageRow } from "@/components/admin/ContactMessageRow";
import { EmptyState } from "@/components/shared/EmptyState";

export default async function AdminMessagesPage() {
  const messages = await getContactMessages().catch(() => null);

  return (
    <div className="space-y-3">
      {messages === null && (
        <EmptyState message="تعذر تحميل الرسائل. تأكد من إعداد الاتصال بقاعدة البيانات." />
      )}
      {messages?.length === 0 && <EmptyState message="لا توجد رسائل تواصل بعد." />}
      {messages?.map((message) => (
        <ContactMessageRow key={message.id} message={message} />
      ))}
    </div>
  );
}
