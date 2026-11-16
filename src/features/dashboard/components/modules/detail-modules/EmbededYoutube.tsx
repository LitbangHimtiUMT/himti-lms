interface YoutubeEmbedProps {
  videoId: string;
  customHeight?: string;
}

// A YouTube video ID is exactly 11 URL-safe characters. The ID comes from
// the API, which extracts it loosely from stored URLs (and old rows were
// never validated), so anything else is refused here instead of being
// interpolated into the embed URL, where / ? # could rewrite its path.
const YOUTUBE_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

export const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ videoId }) => {
  if (!YOUTUBE_ID_PATTERN.test(videoId)) {
    return null;
  }

  return (
    <div className="aspect-w-16 aspect-h-9 w-full">
      <iframe
        className="w-full lg:min-h-[600px] h-72 rounded-md"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-presentation"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>
    </div>
  );
};
