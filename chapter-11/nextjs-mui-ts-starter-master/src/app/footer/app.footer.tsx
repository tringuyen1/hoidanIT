
"use client"
import AppBar from '@mui/material/AppBar';
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Container from "@mui/material/Container";
const AppFooter = () => {

    return (
        <>
            <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, backgroundColor: "#f2f2f2" }}>
                <Container sx={{ display: "flex", gap: 10 }}>
                    <AudioPlayer
                        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3"
                        volume={0.5}
                        style={{ boxShadow: "unset" }}
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
                            song name
                        </div>
                    </div>
                </Container>

            </AppBar>
        </>
    )
}

export default AppFooter;