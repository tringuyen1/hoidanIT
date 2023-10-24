"use Client"

import { useEffect, useRef } from "react"
import WaveSurfer from 'wavesurfer.js'

const WaveTrack = () => {

    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        if (containerRef.current) {
            const waveSurfer = WaveSurfer.create({
                container: containerRef.current,
                waveColor: 'rgb(200, 0, 200)',
                progressColor: 'rgb(100, 0, 100)',
                url: '/audio/hoidanit.mp3',
            })

            waveSurfer.on('click', () => {
                waveSurfer.play()
            })
        }

    }, [])

    return (
        <>
            <div ref={containerRef}>
                WaveTrack page
            </div>
        </>
    )
}

export default WaveTrack;