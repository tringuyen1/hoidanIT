
"use client"
import AppBar from '@mui/material/AppBar';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Container from "@mui/material/Container";
import { useContext } from 'react';
import { TrackContext, useTrackContext } from '@/lib/track.wrapper';


const AppFooter = () => {
    const { currentTrack, setcurrentTrack } = useTrackContext() as ITrackContext


    console.log(currentTrack)

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
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/hoidanit.mp3`} // show song mp3
                        volume={0.5}
                        style={{ boxShadow: "unset", backgroundColor: "#f2f2f2" }}
                        layout='horizontal-reverse'
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
                            Who am I ?
                        </div>
                    </div>
                </Container>
            </AppBar>
        </div>
    )
}

export default AppFooter;