"use Client";

import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useWaveSurfer } from "@/app/utils/customHook";
import { WaveSurferOptions } from "waveSurfer.js";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import "./wave.scss";

const WaveTrack = (props: any) => {
     const [isPlaying, setIsPlaying] = useState(false);
     const containerRef = useRef<HTMLDivElement>(null);
     const [time, setTime] = useState<string>("0:00");
     const [duration, setDuration] = useState<string>("0:00");
     const hoverRef = useRef<HTMLDivElement>(null);
     const searchParams = useSearchParams();
     const fileName = searchParams.get("audio");


     const formatTime = (seconds: number) => {
          const minutes = Math.floor(seconds / 60)
          const secondsRemainder = Math.round(seconds) % 60
          const paddedSeconds = `0${secondsRemainder}`.slice(-2)
          return `${minutes}:${paddedSeconds}`
     }

     const optionsMemo = useMemo((): Omit<WaveSurferOptions, "container"> => {
          let gradient, progressGradient;

          if (typeof window !== "undefined") {
               const canvas = document.createElement('canvas');
               const ctx = canvas.getContext('2d')!;
               // Define the waveform gradient
               gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
               gradient.addColorStop(0, '#656666') // Top color
               gradient.addColorStop((canvas.height * 0.7) / canvas.height, '#656666') // Top color
               gradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
               gradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
               gradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#B1B1B1') // Bottom color
               gradient.addColorStop(1, '#B1B1B1') // Bottom color

               // Define the progress gradient
               progressGradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.6)
               progressGradient.addColorStop(0, '#EE772F') // Top color
               progressGradient.addColorStop((canvas.height * 0.7) / canvas.height, '#EB4926') // Top color
               progressGradient.addColorStop((canvas.height * 0.7 + 1) / canvas.height, '#ffffff') // White line
               progressGradient.addColorStop((canvas.height * 0.7 + 2) / canvas.height, '#ffffff') // White line
               progressGradient.addColorStop((canvas.height * 0.7 + 3) / canvas.height, '#F6B094') // Bottom color
               progressGradient.addColorStop(1, '#F6B094') // Bottom color
          }

          return {
               progressColor: progressGradient,
               barWidth: 3,
               waveColor: gradient,
               // url: `/api?audio=${fileName}`,
               height: 100,
               url: "http://localhost:3000/audio/hoidanit.mp3"
          };
     }, []); // lưu lại giá trị value chỉ render 1 lần. biến số không thay đổi cho dù render bao nhiêu lần.

     const waveSurfer = useWaveSurfer(containerRef, optionsMemo);

     useEffect(() => {
          if (!waveSurfer) return;
          setIsPlaying(false);
          const hover = hoverRef.current! as HTMLElement;
          const waveForm = containerRef.current!;
          waveForm.addEventListener('pointermove', (e) => (hover.style.width = `${e.offsetX}px`));

          const subscriptions = [
               waveSurfer.on("play", () => setIsPlaying(true)),
               waveSurfer.on("pause", () => setIsPlaying(false)),
               waveSurfer.on('decode', (duration) => {
                    setDuration(formatTime(duration))
               }),
               waveSurfer.on('timeupdate', (currentTime) => {
                    setTime(formatTime(currentTime));
               }),

               waveSurfer.on('interaction', () => {
                    waveSurfer.playPause()
               })
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
          <div style={{ marginTop: 20 }}>
               <div
                    style={{
                         display: "flex",
                         gap: 15,
                         padding: 20,
                         height: 400,
                         background: "linear-gradient(135deg, rgb(106, 112, 67) 0%, rgb(11, 15, 20) 100%)"
                    }}
               >
                    <div className="left"
                         style={{
                              width: "75%",
                              height: "calc(100% - 10px)",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-between"
                         }}
                    >
                         <div className="info" style={{ display: "flex" }}>
                              <div>
                                   <div
                                        onClick={() => onPlayClick()}
                                        style={{
                                             borderRadius: "50%",
                                             background: "#f50",
                                             height: "50px",
                                             width: "50px",
                                             display: "flex",
                                             alignItems: "center",
                                             justifyContent: "center",
                                             cursor: "pointer"
                                        }}
                                   >
                                        {isPlaying === true ?
                                             <PauseIcon
                                                  sx={{ fontSize: 30, color: "white" }}
                                             />
                                             :
                                             <PlayArrowIcon
                                                  sx={{ fontSize: 30, color: "white" }}
                                             />
                                        }
                                   </div>
                              </div>
                              <div style={{ marginLeft: 20 }}>
                                   <div style={{
                                        padding: "0 5px",
                                        background: "#333",
                                        fontSize: 30,
                                        width: "fit-content",
                                        color: "white"
                                   }}>
                                        Song
                                   </div>
                                   <div style={{
                                        padding: "0 5px",
                                        marginTop: 10,
                                        background: "#333",
                                        fontSize: 20,
                                        width: "fit-content",
                                        color: "white"
                                   }}
                                   >
                                        Author
                                   </div>
                              </div>
                         </div>
                         <div ref={containerRef} className="wave-form-container">
                              <div className="time" >{time}</div>
                              <div className="duration" >{duration}</div>
                              <div ref={hoverRef} className="hover-wave"></div>
                              <div className="overlay"
                                   style={{
                                        position: "absolute",
                                        height: "30px",
                                        width: "100%",
                                        bottom: "0",
                                        // background: "#ccc"
                                        backdropFilter: "brightness(0.5)"
                                   }}
                              ></div>
                              <div className="comments">
                                   <img style={{
                                        height: 20,
                                        width: 20,
                                        position: "relative",
                                        top: 90,
                                        zIndex: 20
                                   }}
                                        src="http://localhost:3000/audio/chill1.png" />
                              </div>
                         </div>
                    </div>
                    <div className="right"
                         style={{
                              width: "25%",
                              padding: 15,
                              display: "flex",
                              alignItems: "center"
                         }}
                    >
                         <div style={{
                              background: "#ccc",
                              width: 250,
                              height: 250
                         }}>
                         </div>
                    </div>
               </div>
          </div >
     );
};

export default WaveTrack;
