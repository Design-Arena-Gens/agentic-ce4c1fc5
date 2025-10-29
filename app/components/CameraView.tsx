"use client";

import { motion } from "framer-motion";
import { AspectRatio, CompositionGuide, CameraMode, SceneType, CameraSettings } from "../page";

interface CameraViewProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  aspectRatio: AspectRatio;
  compositionGuide: CompositionGuide;
  recording: boolean;
  mode: CameraMode;
  sceneType: SceneType;
  cameraSettings: CameraSettings;
}

export default function CameraView({
  videoRef,
  aspectRatio,
  compositionGuide,
  recording,
  mode,
  sceneType,
  cameraSettings,
}: CameraViewProps) {
  const renderCompositionGuide = () => {
    if (compositionGuide === "none") return null;

    if (compositionGuide === "thirds") {
      return (
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="33.33" y1="0" x2="33.33" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
            <line x1="66.66" y1="0" x2="66.66" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
            <line x1="0" y1="33.33" x2="100" y2="33.33" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
            <line x1="0" y1="66.66" x2="100" y2="66.66" stroke="rgba(255,255,255,0.3)" strokeWidth="0.2" />
            <circle cx="33.33" cy="33.33" r="1.5" fill="rgba(255,255,255,0.5)" />
            <circle cx="66.66" cy="33.33" r="1.5" fill="rgba(255,255,255,0.5)" />
            <circle cx="33.33" cy="66.66" r="1.5" fill="rgba(255,255,255,0.5)" />
            <circle cx="66.66" cy="66.66" r="1.5" fill="rgba(255,255,255,0.5)" />
          </svg>
        </div>
      );
    }

    if (compositionGuide === "golden") {
      return (
        <div className="absolute inset-0 pointer-events-none">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <line x1="38.2" y1="0" x2="38.2" y2="100" stroke="rgba(255,215,0,0.3)" strokeWidth="0.2" />
            <line x1="61.8" y1="0" x2="61.8" y2="100" stroke="rgba(255,215,0,0.3)" strokeWidth="0.2" />
            <line x1="0" y1="38.2" x2="100" y2="38.2" stroke="rgba(255,215,0,0.3)" strokeWidth="0.2" />
            <line x1="0" y1="61.8" x2="100" y2="61.8" stroke="rgba(255,215,0,0.3)" strokeWidth="0.2" />
          </svg>
        </div>
      );
    }

    if (compositionGuide === "center") {
      return (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-16 h-16 border-2 border-white/30 rounded-full" />
          <div className="absolute w-1 h-8 bg-white/30" />
          <div className="absolute w-8 h-1 bg-white/30" />
        </div>
      );
    }
  };

  const getAspectClass = () => {
    switch (aspectRatio) {
      case "2.39:1":
        return "aspect-cinema";
      case "16:9":
        return "aspect-video";
      case "1:1":
        return "aspect-square";
      case "4:3":
        return "aspect-[4/3]";
      default:
        return "aspect-video";
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black">
      <div className={`relative w-full ${getAspectClass()} max-h-screen overflow-hidden`}>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />

        {renderCompositionGuide()}

        {recording && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute top-6 left-6 flex items-center gap-2 bg-red-600/80 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-3 h-3 bg-white rounded-full"
            />
            <span className="text-white text-sm font-semibold">REC</span>
          </motion.div>
        )}

        {mode === "pro" && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-6 right-6 bg-dark-surface/90 backdrop-blur-md rounded-2xl px-4 py-3 space-y-1"
          >
            <div className="text-xs text-gray-400 uppercase tracking-wider">Scene: {sceneType}</div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
              <span className="text-gray-400">ISO</span>
              <span className="text-white font-semibold">{cameraSettings.iso}</span>
              <span className="text-gray-400">f/</span>
              <span className="text-white font-semibold">{cameraSettings.aperture}</span>
              <span className="text-gray-400">SS</span>
              <span className="text-white font-semibold">{cameraSettings.shutterSpeed}</span>
              <span className="text-gray-400">WB</span>
              <span className="text-white font-semibold text-xs">{cameraSettings.whiteBalance}</span>
            </div>
          </motion.div>
        )}

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
