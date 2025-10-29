"use client";

import { motion } from "framer-motion";
import { Camera, Video, Zap, Settings, Image, Circle } from "lucide-react";
import { CameraMode } from "../page";

interface ControlPanelProps {
  mode: CameraMode;
  setMode: (mode: CameraMode) => void;
  recording: boolean;
  setRecording: (recording: boolean) => void;
  flashMode: "off" | "on" | "auto";
  setFlashMode: (mode: "off" | "on" | "auto") => void;
  onCapture: () => void;
  onOpenGallery: () => void;
  onOpenSettings: () => void;
  capturedCount: number;
}

export default function ControlPanel({
  mode,
  setMode,
  recording,
  setRecording,
  flashMode,
  setFlashMode,
  onCapture,
  onOpenGallery,
  onOpenSettings,
  capturedCount,
}: ControlPanelProps) {
  const cycleFlashMode = () => {
    const modes: Array<"off" | "on" | "auto"> = ["off", "auto", "on"];
    const currentIndex = modes.indexOf(flashMode);
    setFlashMode(modes[(currentIndex + 1) % modes.length]);
  };

  return (
    <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-6 px-6 z-20">
      {/* Mode Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex gap-4 bg-dark-surface/80 backdrop-blur-lg rounded-full px-6 py-3"
      >
        <button
          onClick={() => setMode("auto")}
          className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
            mode === "auto"
              ? "bg-white text-black"
              : "text-white/70 hover:text-white"
          }`}
        >
          AUTO
        </button>
        <button
          onClick={() => setMode("pro")}
          className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
            mode === "pro"
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              : "text-white/70 hover:text-white"
          }`}
        >
          PRO
        </button>
        <button
          onClick={() => setMode("video")}
          className={`px-6 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
            mode === "video"
              ? "bg-red-600 text-white"
              : "text-white/70 hover:text-white"
          }`}
        >
          VIDEO
        </button>
      </motion.div>

      {/* Main Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-between w-full max-w-2xl"
      >
        {/* Gallery Button */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onOpenGallery}
          className="relative w-16 h-16 rounded-2xl overflow-hidden bg-dark-surface border-2 border-white/20 hover:border-white/40 transition-all duration-300"
        >
          <Image className="w-8 h-8 text-white absolute inset-0 m-auto" />
          {capturedCount > 0 && (
            <div className="absolute top-1 right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-xs font-bold">
              {capturedCount}
            </div>
          )}
        </motion.button>

        {/* Capture Button */}
        <div className="relative">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => {
              if (mode === "video") {
                setRecording(!recording);
              } else {
                onCapture();
              }
            }}
            className={`relative w-20 h-20 rounded-full border-4 transition-all duration-300 ${
              recording
                ? "border-red-600 bg-red-600"
                : "border-white bg-transparent hover:bg-white/10"
            }`}
          >
            {mode === "video" ? (
              recording ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-8 h-8 bg-white rounded-sm m-auto"
                />
              ) : (
                <Circle className="w-12 h-12 text-red-600 fill-red-600 m-auto" />
              )
            ) : (
              <div className="w-16 h-16 bg-white rounded-full m-auto" />
            )}
          </motion.button>
          {mode === "video" && !recording && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-white/60 whitespace-nowrap"
            >
              Tap to record
            </motion.div>
          )}
        </div>

        {/* Settings & Flash */}
        <div className="flex flex-col gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={cycleFlashMode}
            className="w-12 h-12 rounded-full bg-dark-surface/80 backdrop-blur-lg border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center"
          >
            <Zap
              className={`w-6 h-6 ${
                flashMode === "on"
                  ? "text-yellow-400 fill-yellow-400"
                  : flashMode === "auto"
                  ? "text-blue-400"
                  : "text-white/60"
              }`}
            />
            {flashMode === "auto" && (
              <span className="absolute -bottom-5 text-[10px] text-white/60">AUTO</span>
            )}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onOpenSettings}
            className="w-12 h-12 rounded-full bg-dark-surface/80 backdrop-blur-lg border border-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center"
          >
            <Settings className="w-6 h-6 text-white/80" />
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
