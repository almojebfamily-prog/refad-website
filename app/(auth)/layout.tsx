import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-neutral-100 px-6 py-16">
      <Link href="/" className="mb-8 flex items-center justify-center">
        <Image
          src="/logo-portal.png"
          alt="صندوق رفاد"
          width={360}
          height={240}
          className="h-[240px] w-auto object-contain"
          priority
        />
      </Link>
      <div className="w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
        {children}
      </div>
    </main>
  );
}
