import { useSound } from './hooks/useSound';

export const Testing1 = () => {
	const { play, pause, isPlaying } = useSound({ soundSrc: '/sound/song5.mp3' });
	return (
		<button
			onClick={() => {
				if (isPlaying) {
					pause();
				} else {
					play();
				}
			}}
		>
			Testing1
		</button>
	);
};
