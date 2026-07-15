"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const chapters = [
  { time: 5, label: "0:05", title: "Create a Flow" },
  { time: 129, label: "2:09", title: "Flow Details" },
  { time: 278, label: "4:38", title: "Flow Features" },
  { time: 486, label: "8:06", title: "Running a Flow" },
];

interface VideoModalProps {
  open: boolean;
  onClose: () => void;
}

export default function VideoModal({ open, onClose }: VideoModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeChapter, setActiveChapter] = useState(0);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open && videoRef.current) {
      videoRef.current.pause();
    }
  }, [open]);

  const handleChapterClick = (time: number, index: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      videoRef.current.play();
    }
    setActiveChapter(index);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const t = videoRef.current.currentTime;
    let idx = 0;
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (t >= chapters[i].time) { idx = i; break; }
    }
    setActiveChapter(idx);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] animate-[fadeIn_0.3s_ease]">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-[90%] max-w-[1200px] mx-auto mt-[5%] z-[10000]">
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white p-2 rounded-lg hover:bg-white/10 hover:rotate-90 transition-all cursor-pointer"
        >
          <X size={24} />
        </button>
        <div className="relative w-full pb-[56.25%] bg-white border border-[#C9CFD8] rounded-lg overflow-hidden">
          <video
            ref={videoRef}
            controls
            className="absolute inset-0 w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
          >
            <source src="/videos/demo_video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="flex gap-2 mt-4 p-3 bg-white border border-[#C9CFD8] rounded-lg overflow-x-auto">
          {chapters.map((ch, i) => (
            <button
              key={ch.time}
              onClick={() => handleChapterClick(ch.time, i)}
              className={`flex-1 min-w-[140px] flex flex-col items-center gap-1 px-4 py-3 rounded-lg transition-all cursor-pointer ${
                i === activeChapter
                  ? "bg-[#FFC53D] border-transparent"
                  : "bg-[#F0F2F5] border border-[#E7E9EE] hover:bg-[#FFF6DE]"
              }`}
            >
              <span className={`text-xs font-semibold font-mono ${i === activeChapter ? "text-[#1B2E44]" : "text-[#6B7686]"}`}>
                {ch.label}
              </span>
              <span className="text-sm font-semibold text-[#0E1C2B] whitespace-nowrap">{ch.title}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
