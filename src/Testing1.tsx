import { useSoundContext } from "./SoundContext";

export const Testing1 = () => {
	const soundInstances = useSoundContext() || [];

	const play = (index: number) => {
		soundInstances[index]?.play();
	};
	return (
		<button
			onClick={() => {
				play(0);
			}}
		>
			Testing1
		</button>
	);
};
