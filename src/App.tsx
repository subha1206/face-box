import { useState } from "react";

import "./App.css";
import VideoPlayer from "./VideoPlayer";
import FaceOverlay from "./FaceOverlay";
import { faceConfigData } from "./faceConfigData";

function App() {
  const [currentTime, setCurrentTime] = useState<number>(0);

  const [videoDimensions, setVideoDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 720, height: 480 }); // Default values or state

  const handleVideoLoad = (width: number, height: number) => {
    setVideoDimensions({ width, height });
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-800">
      <p></p>
      <div className=" relative">
        <VideoPlayer
          onTimeUpdate={setCurrentTime}
          onVideoLoad={handleVideoLoad}
          videoSrc={faceConfigData.full_video_url}
        />
        <FaceOverlay
          width={videoDimensions.width}
          height={videoDimensions.height}
          faceConfigs={faceConfigData.face_config_data}
          currentTime={currentTime}
        />
      </div>
    </div>
  );
}

export default App;
