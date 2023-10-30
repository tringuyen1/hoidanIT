
"use client"
import AppBar from '@mui/material/AppBar';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Container from "@mui/material/Container";
import { TrackContext, useTrackContext } from '@/lib/track.wrapper';
import { useRef } from 'react';


const AppFooter = () => {
    const { currentTrack, setCurrentTrack } = useTrackContext() as ITrackContext
    const playerRef = useRef(null);

    // @ts-ignore
    if (playerRef?.current?.audio?.current) {
        if (currentTrack.isPlaying) {
            // @ts-ignore
            playerRef.current?.audio?.current.play();
        } else {
            // @ts-ignore
            playerRef.current?.audio?.current.pause();
        }
    }

    return (
        <div style={{ marginTop: "50px" }}>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, backgroundColor: "#f2f2f2" }}>
                <Container sx={{
                    display: "flex", gap: 10,
                    ".rhap_main": {
                        gap: "30px"
                    }
                }}>
                    <AudioPlayer
                        ref={playerRef}
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`} // show song mp3
                        volume={0.5}
                        style={{ boxShadow: "unset", backgroundColor: "#f2f2f2" }}
                        layout='horizontal-reverse'
                        loop={currentTrack.isPlaying}
                        onPlay={() => {
                            setCurrentTrack({
                                ...currentTrack, isPlaying: true
                            })
                        }}
                        onPause={() => {
                            setCurrentTrack({
                                ...currentTrack, isPlaying: false
                            })
                        }}
                    />

                    <div className='' style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "start",
                        minWidth: 100
                    }}>
                        <div style={{ color: "#ccc" }}>
                            author
                        </div>
                        <div style={{ color: "black" }}>
                            {currentTrack.title}
                        </div>
                    </div>
                </Container>
            </AppBar>
        </div>
    )
}

export default AppFooter;