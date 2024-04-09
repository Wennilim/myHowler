import { Howl, HowlOptions } from 'howler';
import { useCallback, useEffect, useState } from 'react';

const useSound = ({
	soundSrc,
	pauseMode = false,
	isLoop = false,
	volume = 0.5,
	options,
}: {
	soundSrc: string;
	pauseMode?: boolean;
	isLoop?: boolean;
	volume?: number;
	options?: HowlOptions;
}) => {
	const [currentSound, setCurrentSound] = useState<Howl | null>(null);
	const [isPlaying, setIsPlaying] = useState<boolean>(false);

	useEffect(() => {
		const sound = new Howl({
			src: [soundSrc],
			loop: isLoop,
			volume,
			onplay: () => setIsPlaying(true),
			onpause: () => setIsPlaying(false),
			onend: () => setIsPlaying(false),
			...options,
		});

		setCurrentSound(sound);

		return () => {
			sound.unload();
		};
	}, [soundSrc, isLoop, volume, options]);

	const play = useCallback(() => {
		if (pauseMode) {
			if (currentSound) {
				if (!isPlaying) {
					currentSound.play();
					setIsPlaying(true);
				}
			}
		}
		if (currentSound) {
			currentSound.play();
			setIsPlaying(true);
		}
	}, [currentSound]);

	const stop = useCallback(() => {
		if (currentSound) {
			currentSound.stop();
			setIsPlaying(false);
		}
	}, [currentSound]);

	const pause = useCallback(() => {
		if (currentSound && isPlaying) {
			currentSound.pause();
			setIsPlaying(false);
		}
	}, [currentSound, isPlaying]);

	return { play, stop, pause, isPlaying };
};

export { useSound };
