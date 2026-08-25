/**
 * Turns a YouTube or Vimeo URL into an embeddable iframe src.
 * Returns null for anything else — callers should fall back to a plain link.
 */
export function getEmbedUrl(videoUrl: string): string | null {
  let url: URL;
  try {
    url = new URL(videoUrl);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "");

  if (host === "youtube.com" || host === "m.youtube.com") {
    if (url.pathname === "/watch") {
      const id = url.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    const shortsMatch = url.pathname.match(/^\/shorts\/([\w-]+)/);
    if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`;
    if (url.pathname.startsWith("/embed/")) return `https://www.youtube.com${url.pathname}`;
    return null;
  }

  if (host === "youtu.be") {
    const id = url.pathname.slice(1);
    return id ? `https://www.youtube.com/embed/${id}` : null;
  }

  if (host === "vimeo.com") {
    const id = url.pathname.match(/^\/(\d+)/)?.[1];
    return id ? `https://player.vimeo.com/video/${id}` : null;
  }

  if (host === "player.vimeo.com") {
    return url.pathname.startsWith("/video/") ? url.toString() : null;
  }

  return null;
}
