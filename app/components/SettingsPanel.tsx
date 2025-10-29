"use client";

import { motion } from "framer-motion";
import { X, Mic, Type, Contrast, Volume2, Accessibility } from "lucide-react";
import { AccessibilitySettings } from "../page";

interface SettingsPanelProps {
  accessibility: AccessibilitySettings;
  setAccessibility: (settings: AccessibilitySettings) => void;
  onClose: () => void;
}

export default function SettingsPanel({
  accessibility,
  setAccessibility,
  onClose,
}: SettingsPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-dark-surface rounded-3xl p-8 max-w-md w-full border border-white/10"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <Accessibility className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-white text-2xl font-bold">Settings</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Accessibility Section */}
        <div className="space-y-6">
          <div>
            <h3 className="text-white/70 text-sm font-semibold uppercase tracking-wider mb-4">
              Accessibility
            </h3>

            {/* Voice Commands */}
            <div className="bg-dark-hover rounded-2xl p-5 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Mic className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Voice Commands</p>
                    <p className="text-white/50 text-sm">Control camera with voice</p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setAccessibility({ ...accessibility, voiceCommands: !accessibility.voiceCommands })
                  }
                  className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                    accessibility.voiceCommands ? "bg-blue-500" : "bg-dark-border"
                  }`}
                >
                  <motion.div
                    animate={{ x: accessibility.voiceCommands ? 28 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-5 h-5 bg-white rounded-full"
                  />
                </button>
              </div>
              {accessibility.voiceCommands && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  <p className="text-white/60 text-xs mb-2">Available commands:</p>
                  <div className="flex flex-wrap gap-2">
                    {["Capture", "Record", "Pro Mode", "Auto Mode"].map((cmd) => (
                      <span
                        key={cmd}
                        className="px-3 py-1 bg-dark-surface rounded-lg text-xs text-white/70"
                      >
                        "{cmd}"
                      </span>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Font Size */}
            <div className="bg-dark-hover rounded-2xl p-5 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <Type className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Text Size</p>
                  <p className="text-white/50 text-sm">Adjust interface text size</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setAccessibility({ ...accessibility, fontSize: "normal" })}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                    accessibility.fontSize === "normal"
                      ? "bg-white text-black"
                      : "bg-dark-surface text-white/60 hover:text-white"
                  }`}
                >
                  Normal
                </button>
                <button
                  onClick={() => setAccessibility({ ...accessibility, fontSize: "large" })}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                    accessibility.fontSize === "large"
                      ? "bg-white text-black"
                      : "bg-dark-surface text-white/60 hover:text-white"
                  }`}
                >
                  Large
                </button>
                <button
                  onClick={() => setAccessibility({ ...accessibility, fontSize: "extra-large" })}
                  className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                    accessibility.fontSize === "extra-large"
                      ? "bg-white text-black"
                      : "bg-dark-surface text-white/60 hover:text-white"
                  }`}
                >
                  Extra
                </button>
              </div>
            </div>

            {/* High Contrast */}
            <div className="bg-dark-hover rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center">
                    <Contrast className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">High Contrast</p>
                    <p className="text-white/50 text-sm">Enhance visual clarity</p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setAccessibility({ ...accessibility, highContrast: !accessibility.highContrast })
                  }
                  className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                    accessibility.highContrast ? "bg-yellow-500" : "bg-dark-border"
                  }`}
                >
                  <motion.div
                    animate={{ x: accessibility.highContrast ? 28 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute top-1 w-5 h-5 bg-white rounded-full"
                  />
                </button>
              </div>
            </div>
          </div>

          {/* App Info */}
          <div className="pt-6 border-t border-white/10">
            <div className="text-center space-y-2">
              <h3 className="text-white font-semibold text-lg">ProCam</h3>
              <p className="text-white/50 text-sm">Professional Camera Application</p>
              <p className="text-white/30 text-xs">Version 1.0.0</p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
