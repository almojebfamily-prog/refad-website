import Image from "next/image";
import { Sprout } from "lucide-react";

/**
 * Renders an initiative's uploaded icon image (SVG/PNG/WebP, stored in Vercel
 * Blob — see app/actions/admin/initiative-types.ts). Falls back to a generic
 * sprout icon when no icon has been uploaded yet.
 */
export function InitiativeIcon({
  src,
  size = 24,
  className,
}: {
  src?: string | null;
  size?: number;
  className?: string;
}) {
  if (!src) {
    return <Sprout size={size} className={className} />;
  }

  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      unoptimized
      className={className}
      style={{ width: size, height: size, objectFit: "contain" }}
    />
  );
}
