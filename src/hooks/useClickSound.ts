import { Howl } from 'howler';
import { useCallback, useEffect, useRef } from 'react';

const preloadSound = async () => {
	const clickSound = new Howl({
		src: '/sounds/tapEffect.mp3',
		loop: false,
		volume: 0.5,
	});
	clickSound.load();
	return clickSound;
};

const globalClickGameSound = preloadSound();

const useClickSound = () => {
	const clickSoundRef = useRef<Howl | null>(null);

	useEffect(() => {
		const initializeClickSound = async () => {
			clickSoundRef.current = await globalClickGameSound;
		};
		initializeClickSound();
	}, []);

	const play = useCallback(() => {
		const clickSound = clickSoundRef.current;

		if (clickSound) {
			clickSound.stop();
			clickSound.play();
		}
	}, []);

	return { play };
};

export { useClickSound };
