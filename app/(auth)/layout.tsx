import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-neutral-100 px-6 py-16">
      <Link href="/" className="mb-8 flex w-full max-w-[480px] items-center justify-center">
        <Image
          src="/logo-portal.png"
          alt="صندوق رفاد"
          width={480}
          height={320}
          className="h-auto w-full max-w-[480px] object-contain"
          priority
        />
      </Link>
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        {children}
      </div>
    </main>
  );
}
