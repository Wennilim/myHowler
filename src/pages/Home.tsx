// import { usePlayer } from './hooks/usePlayer';
import { useSoundContext } from '../SoundContext';
import { Testing1 } from '../Testing1';
import { Testing2 } from '../Testing2';
// import data from '../data/data.json';
// import { useSound } from '../hooks/useSound';

export const Home = () => {
	// const src = data.map((song) => song.url);
	// const { togglePlay, stop, playNextTrack, playPreviousTrack, upVolume, downVolume, toggleLoop } =
	// 	usePlayer(src);
	// const { pause, play, isPlaying } = useSound({ soundSrc: '/sound/song2.mp3' });
	const soundInstances = useSoundContext() || [];

	const play = (index: number) => {
		soundInstances[index]?.play();
	};
	return (
		<div className='flex gap-3 items-center justify-center'>
			{
				//  <button onClick={togglePlay}>play</button>
				// 		<button onClick={stop}>stop</button>
				// 		<button onClick={playPreviousTrack}>prev</button>
				// 		<button onClick={playNextTrack}>next</button>
				// 		<button onClick={toggleLoop}>loop</button>
				// 		<div className='flex gap-2'>
				// 			<button onClick={upVolume}>+ Vol</button>
				// 			<button onClick={downVolume}>- Vol</button>
				// 		</div>
			}

			<button
				onClick={() => {
					if (play) play(0);
				}}
			>
				song1
			</button>
			<Testing1 />
			<Testing2 />
		</div>
	);
};
