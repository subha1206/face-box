// VideoPlayer.tsx
import { useRef, useEffect, FC } from "react";

interface VideoPlayerProps {
  videoSrc: string;
  onTimeUpdate: (time: number) => void;
  onVideoLoad: (width: number, height: number) => void;
}

const VideoPlayer: FC<VideoPlayerProps> = ({
  onTimeUpdate,
  onVideoLoad,
  videoSrc,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.setAttribute("crossOrigin", "anonymous");
    const handleTimeUpdate = () => {
      if (video.currentTime) {
        onTimeUpdate(video.currentTime * 1000); // Convert to milliseconds
      }
    };

    const handleLoadedMetadata = () => {
      onVideoLoad(video.videoWidth, video.videoHeight);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [onTimeUpdate, onVideoLoad]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoSrc]);

  return (
    <video
      ref={videoRef}
      controls
      width={720}
      onCanPlay={() => {
        videoRef.current?.play();
      }}
    >
      <source src={videoSrc} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;
