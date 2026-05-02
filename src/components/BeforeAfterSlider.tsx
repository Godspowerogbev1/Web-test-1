import React, { useState, useRef, useEffect } from "react";
import { cn } from "@/src/lib/utils";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  className?: string;
}

export default function BeforeAfterSlider({ beforeImage, afterImage, className }: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isResizing || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const position = ((x - rect.left) / rect.width) * 100;

    if (position >= 0 && position <= 100) {
      setSliderPosition(position);
    }
  };

  const handleMouseDown = () => setIsResizing(true);
  const handleMouseUp = () => setIsResizing(false);

  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full aspect-video overflow-hidden rounded-xl cursor-col-resize select-none", className)}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${afterImage})` }}
      />
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: `url(${beforeImage})`,
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      />
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-neutral-400 rounded-full" />
            <div className="w-1 h-3 bg-neutral-400 rounded-full" />
          </div>
        </div>
      </div>
      <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-md text-white text-xs font-bold rounded uppercase tracking-widest">Before</div>
      <div className="absolute top-4 right-4 px-3 py-1 bg-blue-500/50 backdrop-blur-md text-white text-xs font-bold rounded uppercase tracking-widest">After</div>
    </div>
  );
}
