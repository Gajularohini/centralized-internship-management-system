"use client";

import React from "react";

/**
 * NeonBackground Component
 * Creates ambient neon glow blobs in the background
 */
export default function NeonBackground() {
  return (
    <>
      {/* Neon Cyan Blob - Top Left */}
      <div className="absolute -z-10 w-[400px] h-[400px] bg-[#00f5d4]/20 blur-[100px] rounded-full top-20 left-10 animate-pulse"></div>
      
      {/* Electric Purple Blob - Top Right */}
      <div className="absolute -z-10 w-[350px] h-[350px] bg-[#8a63ff]/20 blur-[100px] rounded-full top-40 right-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      {/* Neon Blue Blob - Middle */}
      <div className="absolute -z-10 w-[450px] h-[450px] bg-[#4cc9f0]/15 blur-[120px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>
      
      {/* Hot Pink Blob - Bottom Right */}
      <div className="absolute -z-10 w-[380px] h-[380px] bg-[#ff4ecd]/15 blur-[100px] rounded-full bottom-20 right-10 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Additional ambient glow - Bottom Left */}
      <div className="absolute -z-10 w-[300px] h-[300px] bg-[#00f5d4]/10 blur-[80px] rounded-full bottom-40 left-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
    </>
  );
}
