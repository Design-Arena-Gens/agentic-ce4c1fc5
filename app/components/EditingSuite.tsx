"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { X, Palette, Crop, Download, Play, RotateCw } from "lucide-react";
import { AspectRatio } from "../page";

interface EditingSuiteProps {
  media: string[];
  onClose: () => void;
  aspectRatio: AspectRatio;
  setAspectRatio: (ratio: AspectRatio) => void;
}

type Filter = "none" | "vivid" | "dramatic" | "noir" | "warm" | "cool" | "vintage" | "cinematic";
type ColorGrade = "none" | "film" | "teal-orange" | "moody" | "bright" | "desaturate";

export default function EditingSuite({ media, onClose, aspectRatio, setAspectRatio }: EditingSuiteProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [filter, setFilter] = useState<Filter>("none");
  const [colorGrade, setColorGrade] = useState<ColorGrade>("none");

  const filters: Filter[] = ["none", "vivid", "dramatic", "noir", "warm", "cool", "vintage", "cinematic"];
  const colorGrades: ColorGrade[] = ["none", "film", "teal-orange", "moody", "bright", "desaturate"];
  const aspectRatios: AspectRatio[] = ["16:9", "2.39:1", "1:1", "4:3"];

  const getFilterStyle = () => {
    switch (filter) {
      case "vivid":
        return "saturate-150 contrast-110";
      case "dramatic":
        return "contrast-125 brightness-90";
      case "noir":
        return "grayscale contrast-150";
      case "warm":
        return "sepia-50 saturate-125";
      case "cool":
        return "hue-rotate-15 saturate-110";
      case "vintage":
        return "sepia-75 contrast-90 brightness-105";
      case "cinematic":
        return "contrast-110 saturate-90 brightness-95";
      default:
        return "";
    }
  };

  const getColorGradeStyle = () => {
    switch (colorGrade) {
      case "film":
        return { filter: "contrast(1.1) brightness(0.95)" };
      case "teal-orange":
        return { filter: "contrast(1.15)" };
      case "moody":
        return { filter: "brightness(0.85) contrast(1.2)" };
      case "bright":
        return { filter: "brightness(1.15) saturate(1.1)" };
      case "desaturate":
        return { filter: "saturate(0.6)" };
      default:
        return {};
    }
  };

  const handleDownload = () => {
    if (media[selectedIndex]) {
      const link = document.createElement("a");
      link.href = media[selectedIndex];
      link.download = `procam-${Date.now()}.jpg`;
      link.click();
    }
  };

  if (media.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center"
      >
        <div className="text-center">
          <p className="text-white/60 text-lg mb-4">No media captured yet</p>
          <button
            onClick={onClose}
            className="px-6 py-3 bg-white text-black rounded-full font-semibold hover:bg-white/90 transition-colors"
          >
            Start Shooting
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent p-6">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-xl font-semibold">Editing Suite</h2>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <X className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>

      {/* Main Preview */}
      <div className="absolute inset-0 flex items-center justify-center pt-20 pb-80">
        <motion.img
          key={selectedIndex}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          src={media[selectedIndex]}
          alt="Preview"
          className={`max-w-full max-h-full object-contain ${getFilterStyle()}`}
          style={getColorGradeStyle()}
        />
      </div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-80 left-0 right-0 px-6">
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
          {media.map((item, index) => (
            <motion.button
              key={index}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                selectedIndex === index
                  ? "border-blue-500 scale-105"
                  : "border-white/20 opacity-60"
              }`}
            >
              <img src={item} alt={`Thumbnail ${index}`} className="w-full h-full object-cover" />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Controls Panel */}
      <div className="absolute bottom-0 left-0 right-0 bg-dark-surface/95 backdrop-blur-xl border-t border-white/10 p-6 space-y-6">
        {/* Aspect Ratio */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Crop className="w-4 h-4 text-white/70" />
            <label className="text-white/70 text-sm font-medium">Aspect Ratio</label>
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {aspectRatios.map((ratio) => (
              <button
                key={ratio}
                onClick={() => setAspectRatio(ratio)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0 ${
                  aspectRatio === ratio
                    ? "bg-white text-black"
                    : "bg-dark-hover text-white/60 hover:text-white"
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Palette className="w-4 h-4 text-white/70" />
            <label className="text-white/70 text-sm font-medium">Filters</label>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0 capitalize ${
                  filter === f
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-dark-hover text-white/60 hover:text-white"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Color Grading */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <RotateCw className="w-4 h-4 text-white/70" />
            <label className="text-white/70 text-sm font-medium">Color Grading</label>
          </div>
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {colorGrades.map((grade) => (
              <button
                key={grade}
                onClick={() => setColorGrade(grade)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-shrink-0 capitalize ${
                  colorGrade === grade
                    ? "bg-white text-black"
                    : "bg-dark-hover text-white/60 hover:text-white"
                }`}
              >
                {grade.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleDownload}
            className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Download className="w-5 h-5" />
            Export
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="px-6 bg-dark-hover text-white py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-dark-border transition-colors"
          >
            <Play className="w-5 h-5" />
          </motion.button>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </motion.div>
  );
}
