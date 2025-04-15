interface YoutubeEmbedProps {
  videoId: string;
  customHeight?: string
}

export const YoutubeEmbed: React.FC<YoutubeEmbedProps> = ({ videoId }) => {
  return (
    <div className="aspect-w-16 aspect-h-9 w-full">
      <iframe
        className="w-full lg:h-[400px] h-72 rounded-md"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};
