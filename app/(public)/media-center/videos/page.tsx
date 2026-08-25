import { PageHeader } from "@/components/shared/PageHeader";
import { Section } from "@/components/shared/Section";
import { MediaCenterSubNav } from "@/components/media-center/MediaCenterSubNav";
import { EmptyState } from "@/components/shared/EmptyState";
import { getVideos } from "@/lib/data/videos";
import { getEmbedUrl } from "@/lib/video";
import { PlayCircle } from "lucide-react";

export default async function VideosPage() {
  const videos = await getVideos().catch(() => null);

  return (
    <>
      <PageHeader eyebrow="مركز الإعلام" title="مكتبة الفيديو" />
      <MediaCenterSubNav />

      <Section>
        {videos === null && (
          <EmptyState message="تعذر تحميل الفيديوهات. تأكد من إعداد الاتصال بقاعدة البيانات." />
        )}
        {videos?.length === 0 && <EmptyState message="لا توجد فيديوهات بعد." />}
        {videos && videos.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2">
            {videos.map((video) => {
              const embedUrl = getEmbedUrl(video.video_url);
              return (
                <div
                  key={video.id}
                  className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
                >
                  {embedUrl ? (
                    <div className="aspect-video w-full">
                      <iframe
                        src={embedUrl}
                        title={video.title}
                        allowFullScreen
                        className="h-full w-full"
                      />
                    </div>
                  ) : (
                    <a
                      href={video.video_url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex aspect-video w-full items-center justify-center bg-primary-50 text-primary-700"
                    >
                      <PlayCircle className="h-12 w-12" />
                    </a>
                  )}
                  <div className="p-4">
                    <p className="mb-1 text-xs text-neutral-500">{video.published_date}</p>
                    <h3 className="font-bold text-primary-900">{video.title}</h3>
                    {video.description && (
                      <p className="mt-1 text-sm text-neutral-600">{video.description}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Section>
    </>
  );
}
