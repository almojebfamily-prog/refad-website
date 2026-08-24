import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-neutral-100 px-6 py-16">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-700 text-lg font-bold text-white">
          ر
        </span>
        <span className="text-lg font-bold text-primary-900">
          صندوق رفاد العائلي
        </span>
      </Link>
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        {children}
      </div>
    </main>
  );
}
