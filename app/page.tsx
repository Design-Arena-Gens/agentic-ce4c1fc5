"use client";

import { useState, useEffect, useRef } from "react";
import CameraView from "./components/CameraView";
import ControlPanel from "./components/ControlPanel";
import ProModePanel from "./components/ProModePanel";
import EditingSuite from "./components/EditingSuite";
import SettingsPanel from "./components/SettingsPanel";
import { motion, AnimatePresence } from "framer-motion";

export type CameraMode = "auto" | "pro" | "video";
export type AspectRatio = "16:9" | "2.39:1" | "1:1" | "4:3";
export type CompositionGuide = "none" | "thirds" | "golden" | "center";
export type SceneType = "auto" | "portrait" | "landscape" | "macro" | "night" | "sport";

export interface CameraSettings {
  iso: number;
  aperture: number;
  shutterSpeed: string;
  whiteBalance: string;
  exposure: number;
}

export interface AccessibilitySettings {
  voiceCommands: boolean;
  fontSize: "normal" | "large" | "extra-large";
  highContrast: boolean;
}

export default function Home() {
  const [mode, setMode] = useState<CameraMode>("auto");
  const [recording, setRecording] = useState(false);
  const [showEditingSuite, setShowEditingSuite] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>("16:9");
  const [compositionGuide, setCompositionGuide] = useState<CompositionGuide>("thirds");
  const [sceneType, setSceneType] = useState<SceneType>("auto");
  const [stabilization, setStabilization] = useState(true);
  const [flashMode, setFlashMode] = useState<"off" | "on" | "auto">("auto");
  const [capturedMedia, setCapturedMedia] = useState<string[]>([]);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [cameraSettings, setCameraSettings] = useState<CameraSettings>({
    iso: 400,
    aperture: 2.8,
    shutterSpeed: "1/125",
    whiteBalance: "auto",
    exposure: 0,
  });

  const [accessibility, setAccessibility] = useState<AccessibilitySettings>({
    voiceCommands: false,
    fontSize: "normal",
    highContrast: false,
  });

  useEffect(() => {
    initCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    if (accessibility.voiceCommands) {
      initVoiceCommands();
    }
  }, [accessibility.voiceCommands]);

  const initCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
        },
        audio: mode === "video",
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Camera access denied:", error);
    }
  };

  const initVoiceCommands = () => {
    if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = false;

      recognition.onresult = (event: any) => {
        const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
        handleVoiceCommand(command);
      };

      recognition.start();
    }
  };

  const handleVoiceCommand = (command: string) => {
    if (command.includes("capture") || command.includes("photo")) {
      handleCapture();
    } else if (command.includes("record") || command.includes("video")) {
      setRecording(!recording);
    } else if (command.includes("pro mode")) {
      setMode("pro");
    } else if (command.includes("auto mode")) {
      setMode("auto");
    }
  };

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL("image/jpeg");
        setCapturedMedia([...capturedMedia, imageData]);
        triggerHapticFeedback();
      }
    }
  };

  const triggerHapticFeedback = () => {
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
  };

  const updateSettingsForScene = (scene: SceneType) => {
    setSceneType(scene);
    if (mode === "pro") {
      switch (scene) {
        case "portrait":
          setCameraSettings({
            iso: 200,
            aperture: 1.8,
            shutterSpeed: "1/125",
            whiteBalance: "daylight",
            exposure: 0.3,
          });
          break;
        case "landscape":
          setCameraSettings({
            iso: 100,
            aperture: 8.0,
            shutterSpeed: "1/250",
            whiteBalance: "auto",
            exposure: 0,
          });
          break;
        case "macro":
          setCameraSettings({
            iso: 400,
            aperture: 2.8,
            shutterSpeed: "1/125",
            whiteBalance: "auto",
            exposure: 0.5,
          });
          break;
        case "night":
          setCameraSettings({
            iso: 3200,
            aperture: 1.4,
            shutterSpeed: "1/30",
            whiteBalance: "tungsten",
            exposure: 0.7,
          });
          break;
        case "sport":
          setCameraSettings({
            iso: 800,
            aperture: 4.0,
            shutterSpeed: "1/1000",
            whiteBalance: "auto",
            exposure: 0,
          });
          break;
        default:
          setCameraSettings({
            iso: 400,
            aperture: 2.8,
            shutterSpeed: "1/125",
            whiteBalance: "auto",
            exposure: 0,
          });
      }
    }
  };

  return (
    <main
      className={`w-screen h-screen overflow-hidden bg-dark-bg relative ${
        accessibility.highContrast ? "high-contrast" : ""
      } ${
        accessibility.fontSize === "large" ? "large-text" :
        accessibility.fontSize === "extra-large" ? "extra-large-text" : ""
      }`}
    >
      <CameraView
        videoRef={videoRef}
        aspectRatio={aspectRatio}
        compositionGuide={compositionGuide}
        recording={recording}
        mode={mode}
        sceneType={sceneType}
        cameraSettings={cameraSettings}
      />

      <ControlPanel
        mode={mode}
        setMode={setMode}
        recording={recording}
        setRecording={setRecording}
        flashMode={flashMode}
        setFlashMode={setFlashMode}
        onCapture={handleCapture}
        onOpenGallery={() => setShowEditingSuite(true)}
        onOpenSettings={() => setShowSettings(true)}
        capturedCount={capturedMedia.length}
      />

      <AnimatePresence>
        {mode === "pro" && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <ProModePanel
              settings={cameraSettings}
              setSettings={setCameraSettings}
              sceneType={sceneType}
              setSceneType={updateSettingsForScene}
              compositionGuide={compositionGuide}
              setCompositionGuide={setCompositionGuide}
              stabilization={stabilization}
              setStabilization={setStabilization}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEditingSuite && (
          <EditingSuite
            media={capturedMedia}
            onClose={() => setShowEditingSuite(false)}
            aspectRatio={aspectRatio}
            setAspectRatio={setAspectRatio}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSettings && (
          <SettingsPanel
            accessibility={accessibility}
            setAccessibility={setAccessibility}
            onClose={() => setShowSettings(false)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
