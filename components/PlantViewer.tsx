"use client";

import { Plant, PlantPart } from "@/lib/data";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState } from "react";

interface PlantViewerProps {
  plant: Plant;
  selectedPart: PlantPart | null;
  onPartClick: (part: PlantPart) => void;
  onPartDoubleClick: (part: PlantPart) => void;
  isMobile?: boolean;
}

export function PlantViewer({ plant, selectedPart, onPartClick, onPartDoubleClick, isMobile }: PlantViewerProps) {
  const [hoveredPart, setHoveredPart] = useState<string | null>(null);

  return (
    <div className="flex-1 relative flex items-start justify-center p-4 sm:p-8 overflow-y-auto custom-scrollbar">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)]" />
      
      <div className="relative w-full max-w-2xl aspect-[3/5] bg-white dark:bg-stone-900 rounded-2xl shadow-sm border border-stone-200 dark:border-stone-800 overflow-hidden transition-colors duration-300">
        {/* Plant Image Placeholder */}
        <Image
          src={plant.imageUrl}
          alt={plant.name}
          fill
          className="object-cover opacity-90"
          priority
          referrerPolicy="no-referrer"
        />
        
        {/* Overlay to dim unselected parts when a part is selected */}
        <AnimatePresence>
          {selectedPart && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-stone-900/40 pointer-events-none z-0" 
            />
          )}
        </AnimatePresence>

        {/* Hotspots */}
        {plant.parts.map((part) => {
          const isSelected = selectedPart?.id === part.id;
          const isHovered = hoveredPart === part.id;
          const isActive = isSelected || isHovered;
          const isAnotherSelected = selectedPart !== null && !isSelected;

          // Ensure minimum touch target size on mobile
          const minSize = isMobile ? 44 : 0;

          return (
            <motion.button
              key={part.id}
              className="absolute group z-10"
              style={{
                left: `${part.coordinates.x}%`,
                top: `${part.coordinates.y}%`,
                width: `${Math.max(part.coordinates.width, (minSize / 400) * 100)}%`,
                height: `${Math.max(part.coordinates.height, (minSize / 600) * 100)}%`,
                minWidth: isMobile ? `${minSize}px` : 'auto',
                minHeight: isMobile ? `${minSize}px` : 'auto',
              }}
              onClick={() => onPartClick(part)}
              onDoubleClick={() => onPartDoubleClick(part)}
              onMouseEnter={() => setHoveredPart(part.id)}
              onMouseLeave={() => setHoveredPart(null)}
              animate={{
                opacity: isAnotherSelected ? 0.3 : 1,
                scale: isSelected ? 1.05 : 1,
                zIndex: isSelected ? 20 : 10,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ scale: isAnotherSelected ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Highlight Box */}
              <div 
                className={`w-full h-full rounded-xl border-2 transition-all duration-300 relative ${
                  isSelected 
                    ? 'border-emerald-400 bg-emerald-500/20 shadow-[0_0_30px_rgba(16,185,129,0.5)]' 
                    : isHovered 
                      ? 'border-emerald-400 bg-emerald-400/20' 
                      : 'border-white/60 bg-white/10 hover:border-emerald-300'
                }`}
              >
                {/* Pulsing ring for selected state */}
                {isSelected && (
                  <motion.div
                    className="absolute inset-0 rounded-xl border-2 border-emerald-400"
                    initial={{ opacity: 0.8, scale: 1 }}
                    animate={{ opacity: 0, scale: 1.15 }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
                  />
                )}
              </div>
              
              {/* Label */}
              <div className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 rounded-full text-sm font-bold tracking-wide transition-all duration-300 shadow-lg whitespace-nowrap pointer-events-none ${
                isSelected 
                  ? 'bg-emerald-600 text-white scale-100 opacity-100' 
                  : 'bg-white/95 dark:bg-stone-800/95 text-stone-700 dark:text-stone-300 scale-95 opacity-0'
              }`}>
                {part.name}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Plant Title Overlay */}
      <div className="absolute bottom-4 left-4 sm:bottom-8 sm:left-8 bg-white/90 dark:bg-stone-900/90 backdrop-blur-sm px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl shadow-lg border border-stone-200/50 dark:border-stone-800/50 transition-colors duration-300">
        <h2 className="text-xl sm:text-3xl font-bold text-stone-800 dark:text-stone-100">{plant.name}</h2>
        <p className="text-xs sm:text-base text-stone-500 dark:text-stone-400 italic font-serif">{plant.scientificName}</p>
      </div>
    </div>
  );
}
