import { useSoundContext } from "./SoundContext";

export const Testing2 = () => {
	const soundInstances = useSoundContext() || [];

	const play = (index: number) => {
		soundInstances[index]?.play();
	};
	return (
		<button
			onClick={() => {
				play(1);
			}}
		>
			Testing2
		</button>
	);
};
