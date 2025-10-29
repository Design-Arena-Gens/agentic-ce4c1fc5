"use client";

import { motion } from "framer-motion";
import { Sliders, Eye, Grid3x3, Sparkles } from "lucide-react";
import { CameraSettings, CompositionGuide, SceneType } from "../page";

interface ProModePanelProps {
  settings: CameraSettings;
  setSettings: (settings: CameraSettings) => void;
  sceneType: SceneType;
  setSceneType: (type: SceneType) => void;
  compositionGuide: CompositionGuide;
  setCompositionGuide: (guide: CompositionGuide) => void;
  stabilization: boolean;
  setStabilization: (enabled: boolean) => void;
}

export default function ProModePanel({
  settings,
  setSettings,
  sceneType,
  setSceneType,
  compositionGuide,
  setCompositionGuide,
  stabilization,
  setStabilization,
}: ProModePanelProps) {
  const sceneTypes: SceneType[] = ["auto", "portrait", "landscape", "macro", "night", "sport"];
  const guides: CompositionGuide[] = ["none", "thirds", "golden", "center"];

  return (
    <div className="absolute left-6 top-1/2 -translate-y-1/2 w-72 bg-dark-surface/95 backdrop-blur-xl rounded-3xl p-6 border border-white/10 z-10">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-white font-semibold text-lg">Pro Mode</h2>
          <p className="text-white/50 text-xs">AI-Powered Settings</p>
        </div>
      </div>

      {/* Scene Recognition */}
      <div className="mb-6">
        <label className="text-white/70 text-sm font-medium mb-3 block flex items-center gap-2">
          <Eye className="w-4 h-4" />
          Scene Recognition
        </label>
        <div className="grid grid-cols-3 gap-2">
          {sceneTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSceneType(type)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                sceneType === type
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                  : "bg-dark-hover text-white/60 hover:text-white hover:bg-dark-border"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Composition Guide */}
      <div className="mb-6">
        <label className="text-white/70 text-sm font-medium mb-3 block flex items-center gap-2">
          <Grid3x3 className="w-4 h-4" />
          Composition Guide
        </label>
        <div className="grid grid-cols-2 gap-2">
          {guides.map((guide) => (
            <button
              key={guide}
              onClick={() => setCompositionGuide(guide)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 ${
                compositionGuide === guide
                  ? "bg-white text-black"
                  : "bg-dark-hover text-white/60 hover:text-white hover:bg-dark-border"
              }`}
            >
              {guide === "thirds" ? "Rule of Thirds" : guide.charAt(0).toUpperCase() + guide.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Manual Settings */}
      <div className="space-y-5">
        <div className="flex items-center justify-between mb-2">
          <label className="text-white/70 text-sm font-medium flex items-center gap-2">
            <Sliders className="w-4 h-4" />
            Manual Controls
          </label>
        </div>

        {/* ISO */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-white/60 text-xs">ISO</span>
            <span className="text-white font-semibold text-sm">{settings.iso}</span>
          </div>
          <input
            type="range"
            min="100"
            max="6400"
            step="100"
            value={settings.iso}
            onChange={(e) => setSettings({ ...settings, iso: parseInt(e.target.value) })}
            className="w-full h-2 bg-dark-border rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Aperture */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-white/60 text-xs">Aperture</span>
            <span className="text-white font-semibold text-sm">f/{settings.aperture}</span>
          </div>
          <input
            type="range"
            min="1.4"
            max="22"
            step="0.1"
            value={settings.aperture}
            onChange={(e) => setSettings({ ...settings, aperture: parseFloat(e.target.value) })}
            className="w-full h-2 bg-dark-border rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Exposure */}
        <div>
          <div className="flex justify-between mb-2">
            <span className="text-white/60 text-xs">Exposure</span>
            <span className="text-white font-semibold text-sm">{settings.exposure > 0 ? "+" : ""}{settings.exposure}</span>
          </div>
          <input
            type="range"
            min="-2"
            max="2"
            step="0.1"
            value={settings.exposure}
            onChange={(e) => setSettings({ ...settings, exposure: parseFloat(e.target.value) })}
            className="w-full h-2 bg-dark-border rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Stabilization Toggle */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-white/70 text-sm">Image Stabilization</span>
          <button
            onClick={() => setStabilization(!stabilization)}
            className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${
              stabilization ? "bg-blue-500" : "bg-dark-border"
            }`}
          >
            <motion.div
              animate={{ x: stabilization ? 24 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-1 w-4 h-4 bg-white rounded-full"
            />
          </button>
        </div>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
        }

        .slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(59, 130, 246, 0.5);
        }
      `}</style>
    </div>
  );
}
