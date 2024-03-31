// FaceOverlay.tsx
import { useEffect, useRef, FC } from "react";
import { fabric } from "fabric";

interface FaceConfig {
  x: number;
  y: number;
  size: number;
  score: number;
  label: number;
}

interface SceneConfig {
  scene_idx: number;
  scene_start_frame: number;
  scene_end_frame: number;
  scene_start_ms: number;
  scene_end_ms: number;
  face_config: FaceConfig[];
}

interface FaceOverlayProps {
  width: number;
  height: number;
  faceConfigs: SceneConfig[];
  currentTime: number;
}

const FaceOverlay: FC<FaceOverlayProps> = ({
  width,
  height,
  faceConfigs,
  currentTime,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  console.log({ width, height }, "FaceOverlay props");

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.StaticCanvas(canvasRef.current, {
      selection: false,
      backgroundColor: "transparent",
    });

    canvas.setWidth(720);
    canvas.setHeight(405);
    canvas.calcOffset();

    const visibleFaces = faceConfigs.filter(
      (config) =>
        currentTime >= config.scene_start_ms &&
        currentTime <= config.scene_end_ms
    );

    const originalWidth = 1920;
    const originalHeight = 1080;

    // Calculate scaling factors
    const scaleX = 720 / originalWidth;
    const scaleY = 405 / originalHeight;

    visibleFaces.forEach((scene) => {
      if (scene.face_config.length === 0) {
        console.log("No face configurations for this scene.");
        return; // Skip this scene if there are no face configurations
      }

      const highestScoreBox = scene.face_config.reduce((prev, current) =>
        prev.score > current.score ? prev : current
      );

      const { x, y, size } = highestScoreBox;

      const adjustedX = x * scaleX;
      const adjustedY = y * scaleY;
      const adjustedSize = size * Math.min(scaleX, scaleY);

      const visibilityIncreaseFactor = 2;
      const enhancedSize = adjustedSize * visibilityIncreaseFactor;

      const rect = new fabric.Rect({
        left: adjustedX - enhancedSize / 2,
        top: adjustedY - enhancedSize / 2,
        width: enhancedSize,
        height: enhancedSize,
        fill: "transparent",
        stroke: "red",
        strokeWidth: 4,
      });
      canvas.clear();

      canvas.add(rect);
    });

    canvas.requestRenderAll();
  }, [currentTime, faceConfigs, width, height]);

  return (
    <canvas ref={canvasRef} className="absolute top-0 pointer-events-none" />
  );
};

export default FaceOverlay;
