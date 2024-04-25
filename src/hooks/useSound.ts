import { Howl, HowlOptions } from 'howler';
import { useCallback, useEffect, useState } from 'react';

export interface UseSoundReturn {
	play: () => void;
	stop: () => void;
	pause: () => void;
	isPlaying: boolean;
}

const useSound = ({
	soundSrcList,
	pauseMode = false,
	isLoop = false,
	volume = 0.5,
	options,
}: {
	soundSrcList: string[];
	pauseMode?: boolean;
	isLoop?: boolean;
	volume?: number;
	options?: HowlOptions;
}): UseSoundReturn[] => {
	const [sounds, setSounds] = useState<Array<Howl | null>>([]);
	const [isPlayingList, setIsPlayingList] = useState<boolean[]>(
		Array(soundSrcList.length).fill(false)
	);

	useEffect(() => {
		const loadedSounds = soundSrcList.map((src) => {
			const sound = new Howl({
				src: [src],
				loop: isLoop,
				volume,
				onplay: () => {
					const index = soundSrcList.indexOf(src);
					if (index !== -1) {
						const updatedIsPlayingList = [...isPlayingList];
						updatedIsPlayingList[index] = true;
						setIsPlayingList(updatedIsPlayingList);
					}
				},
				onpause: () => {
					const index = soundSrcList.indexOf(src);
					if (index !== -1) {
						const updatedIsPlayingList = [...isPlayingList];
						updatedIsPlayingList[index] = false;
						setIsPlayingList(updatedIsPlayingList);
					}
				},
				onend: () => {
					const index = soundSrcList.indexOf(src);
					if (index !== -1) {
						const updatedIsPlayingList = [...isPlayingList];
						updatedIsPlayingList[index] = false;
						setIsPlayingList(updatedIsPlayingList);
					}
				},
				...options,
			});
			return sound;
		});

		setSounds(loadedSounds);

		return () => {
			loadedSounds.forEach((sound) => sound.unload());
		};
	}, [soundSrcList, isLoop, volume, options]);

	const play = useCallback(
		(index: number) => {
			if (pauseMode) {
				const currentlyPlayingIndex = isPlayingList.findIndex((playing) => playing);
				if (currentlyPlayingIndex !== -1 && currentlyPlayingIndex !== index) {
					sounds[currentlyPlayingIndex]?.stop();
					const updatedIsPlayingList = [...isPlayingList];
					updatedIsPlayingList[currentlyPlayingIndex] = false;
					setIsPlayingList(updatedIsPlayingList);
				}
			}

			if (sounds[index]) {
				sounds[index]?.play();
				const updatedIsPlayingList = [...isPlayingList];
				updatedIsPlayingList[index] = true;
				setIsPlayingList(updatedIsPlayingList);
			}
		},
		[pauseMode, sounds, isPlayingList]
	);

	const stop = useCallback(
		(index: number) => {
			if (sounds[index]) {
				sounds[index]?.stop();
				const updatedIsPlayingList = [...isPlayingList];
				updatedIsPlayingList[index] = false;
				setIsPlayingList(updatedIsPlayingList);
			}
		},
		[sounds, isPlayingList]
	);

	const pause = useCallback(
		(index: number) => {
			if (sounds[index] && isPlayingList[index]) {
				sounds[index]?.pause();
				const updatedIsPlayingList = [...isPlayingList];
				updatedIsPlayingList[index] = false;
				setIsPlayingList(updatedIsPlayingList);
			}
		},
		[sounds, isPlayingList]
	);

	return soundSrcList.map((_, index) => ({
		play: () => play(index),
		stop: () => stop(index),
		pause: () => pause(index),
		isPlaying: isPlayingList[index],
	}));
};

export default useSound;
