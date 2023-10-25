"use Client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useWaveSurfer } from "@/app/utils/customHook";
import { WaveSurferOptions } from "waveSurfer.js";
import "./wave.scss";

const WaveTrack = (props: any) => {
     const [isPlaying, setIsPlaying] = useState(false);
     const containerRef = useRef<HTMLDivElement>(null);
     const searchParams = useSearchParams();
     const fileName = searchParams.get("audio");


     const formatTime = (seconds: number) => {
          const minutes = Math.floor(seconds / 60)
          const secondsRemainder = Math.round(seconds) % 60
          const paddedSeconds = `0${secondsRemainder}`.slice(-2)
          return `${minutes}:${paddedSeconds}`
     }

     const optionsMemo = useMemo((): Omit<WaveSurferOptions, "container"> => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d")!;

          const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.75);
          gradient.addColorStop(0, "#656666"); // Top color
          gradient.addColorStop((canvas.height * 0.7) / canvas.height, "#656666"); // Top color
          gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, "#ffffff"); // White line
          gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, "#ffffff"); // White line
          gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, "#B1B1B1"); // Bottom color
          gradient.addColorStop(1, "#B1B1B1"); // Bottom color

          const progressGradient = ctx.createLinearGradient(
               0,
               0,
               0,
               canvas.height * 0.75
          );
          progressGradient.addColorStop(0, "#EE772F"); // Top color
          progressGradient.addColorStop(
               (canvas.height * 0.7) / canvas.height,
               "#EB4926"
          ); // Top color
          progressGradient.addColorStop(
               (canvas.height * 0.7 + 1) / canvas.height,
               "#ffffff"
          ); // White line
          progressGradient.addColorStop(
               (canvas.height * 0.7 + 2) / canvas.height,
               "#ffffff"
          ); // White line
          progressGradient.addColorStop(
               (canvas.height * 0.7 + 3) / canvas.height,
               "#F6B094"
          ); // Bottom color
          progressGradient.addColorStop(1, "#F6B094"); // Bottom color

          return {
               progressColor: progressGradient,
               barWidth: 2,
               waveColor: gradient,
               // url: `/api?audio=${fileName}`,
               height: 150,
               url: "http://localhost:3000/audio/hoidanit.mp3"
          };
     }, []); // lưu lại giá trị value chỉ render 1 lần. biến số không thay đổi cho dù render bao nhiêu lần.

     const waveSurfer = useWaveSurfer(containerRef, optionsMemo);

     useEffect(() => {
          if (!waveSurfer) return;
          setIsPlaying(false);
          const timeEl = document.querySelector('#time')!;
          const durationEl = document.querySelector('#duration')!;
          const hover = document.querySelector('#hover')! as HTMLElement;
          const waveForm = containerRef.current!;
          waveForm.addEventListener('pointermove', (e) => (hover.style.width = `${e.offsetX}px`));

          const subscriptions = [
               waveSurfer.on("play", () => setIsPlaying(true)),
               waveSurfer.on("pause", () => setIsPlaying(false)),
               waveSurfer.on('decode', (duration) => (durationEl.textContent = formatTime(duration))),
               waveSurfer.on('timeupdate', (currentTime) => (timeEl.textContent = formatTime(currentTime)))
          ];

          return () => {
               subscriptions.forEach((unsub) => unsub());
          };
     }, [waveSurfer]);

     const onPlayClick = useCallback(() => {
          if (waveSurfer) {
               waveSurfer.isPlaying() ? waveSurfer.pause() : waveSurfer.play();
               setIsPlaying(waveSurfer.isPlaying());
          }
     }, [waveSurfer]); // lưu lại 1 function

     return (
          <>
               <div ref={containerRef} id="wave-form-container" style={{ marginTop: "30px" }}>
                    WaveTrack page
                    <div id="time">0:00</div>
                    <div id="duration">0:00</div>
                    <div id="hover"></div>
               </div>
               <button onClick={() => onPlayClick()}>
                    {isPlaying ? "Pause" : "Play"}
               </button>
          </>
     );
};

export default WaveTrack;
