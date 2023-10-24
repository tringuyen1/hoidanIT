"use Client";

import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
import { useSearchParams } from "next/navigation";

const WaveTrack = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();

  const fileName = searchParams.get("audio");

  useEffect(() => {
    if (containerRef.current) {
      const waveSurfer = WaveSurfer.create({
        container: containerRef.current,
        waveColor: "rgb(200, 0, 200)",
        progressColor: "rgb(100, 0, 100)",
        url: `/api?audio=${fileName}`,
      });

      waveSurfer.on("click", () => {
        waveSurfer.play();
      });
    }
  }, []);

  return (
    <>
      <div ref={containerRef}>WaveTrack page</div>
    </>
  );
};

export default WaveTrack;
