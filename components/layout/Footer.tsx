import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const quickLinks = [
  { href: "/", label: "الرئيسية" },
  { href: "/about-family", label: "عن العائلة" },
  { href: "/refad-fund", label: "صندوق رفاد" },
  { href: "/contact", label: "تواصل معنا" },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-primary-900 text-primary-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          <h3 className="mb-3 text-lg font-bold text-white">صندوق رفاد العائلي</h3>
          <p className="text-sm leading-relaxed text-primary-200">
            جذور راسخة، ومستقبل مشرق. المنصة الرقمية لعائلة المعجب لتعزيز
            التواصل والتكافل بين أفراد العائلة عبر الأجيال.
          </p>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-bold text-white">روابط سريعة</h3>
          <ul className="space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-lg font-bold text-white">تواصل معنا</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 shrink-0" />
              <span>info@refad.sa</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 shrink-0" />
              <span dir="ltr">+966 5X XXX XXXX</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>المملكة العربية السعودية</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-800 py-6 text-center text-xs text-primary-300">
        © {new Date().getFullYear()} صندوق رفاد العائلي. جميع الحقوق محفوظة.
      </div>
    </footer>
  );
}
