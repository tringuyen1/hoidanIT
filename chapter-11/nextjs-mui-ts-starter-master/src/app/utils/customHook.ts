import { useState, useEffect, RefObject } from 'react';
import WaveSurfer from "waveSurfer.js";
import { WaveSurferOptions } from "waveSurfer.js";

export const useHasMounted = () => {
	const [hasMounted, setHasMounted] = useState<boolean>(false);
	useEffect(() => {
		setHasMounted(true);
	}, []);

	return hasMounted;
}

export const useScript = (url: string) => {
	useEffect(() => {
		const script = document.createElement('script');

		script.src = url;
		script.async = true;

		document.body.appendChild(script);

		return () => {
			document.body.removeChild(script);
		}
	}, [url]);
};

export const useWaveSurfer = (
	containerRef: RefObject<HTMLDivElement>,
	options: Omit<WaveSurferOptions, "container">
) => {
	const [waveSurfer, setWaveSurfer] = useState<WaveSurfer | null>(null);

	useEffect(() => {
		if (!containerRef.current) return;

		const ws = WaveSurfer.create({
			...options,
			container: containerRef.current,
		});

		setWaveSurfer(ws);

		return () => {
			ws.destroy();
		};
	}, [options, containerRef]);

	return waveSurfer;
};