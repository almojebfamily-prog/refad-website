import dynamic from "next/dynamic";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { Sprout, type LucideProps } from "lucide-react";
import type { ComponentType } from "react";

export type IconName = keyof typeof dynamicIconImports;

export function isValidIconName(name: string): name is IconName {
  return name in dynamicIconImports;
}

// One dynamic()-wrapped component per icon name, created lazily and reused —
// calling dynamic() fresh on every render would remount the icon each time.
const iconComponentCache = new Map<IconName, ComponentType<LucideProps>>();

function getIconComponent(name: IconName) {
  let Component = iconComponentCache.get(name);
  if (!Component) {
    Component = dynamic(dynamicIconImports[name]) as ComponentType<LucideProps>;
    iconComponentCache.set(name, Component);
  }
  return Component;
}

/**
 * Renders a Lucide icon by name (any of the ~1600 names at lucide.dev/icons),
 * loading only that icon's chunk on demand. Falls back to a generic sprout
 * icon when `name` is missing or isn't a real Lucide icon name — so a typo in
 * an admin-entered icon key never breaks the page.
 */
export function InitiativeIcon({
  name,
  size = 24,
  className,
  color,
}: {
  name?: string | null;
  size?: number;
  className?: string;
  color?: string;
}) {
  if (name && isValidIconName(name)) {
    /* eslint-disable react-hooks/static-components -- getIconComponent caches by name, so the same component reference is reused across renders, not recreated. */
    const Icon = getIconComponent(name);
    return <Icon size={size} className={className} color={color} />;
    /* eslint-enable react-hooks/static-components */
  }

  return <Sprout size={size} className={className} color={color} />;
}
