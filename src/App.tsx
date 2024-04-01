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

  const [faceConfigDataFromUser, setFaceConfigDataFromUser] =
    useState(faceConfigData);

  const [localFaceConfigData, setLocalFaceConfigData] = useState("");

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-800 flex-col text-white">
      <div className="relative">
        <VideoPlayer
          onTimeUpdate={setCurrentTime}
          onVideoLoad={handleVideoLoad}
          videoSrc={faceConfigDataFromUser?.full_video_path}
        />
        <FaceOverlay
          width={videoDimensions.width}
          height={videoDimensions.height}
          faceConfigs={faceConfigDataFromUser?.scores}
          currentTime={currentTime}
        />
      </div>
      <textarea
        className=" bg-gray-800 text-white h-40 w-[720px] mt-4 border-white outline outline-white"
        value={localFaceConfigData}
        onChange={(e) => {
          setLocalFaceConfigData(e.target.value);
        }}
      />
      <button
        onClick={() => {
          setFaceConfigDataFromUser(JSON.parse(localFaceConfigData));
          setCurrentTime(0);
        }}
        className="mt-2"
      >
        Submit
      </button>
    </div>
  );
}

export default App;
