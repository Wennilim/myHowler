// import { usePlayer } from './hooks/usePlayer';
// import data from './data/data.json';
import { useSound } from './hooks/useSound';
import { Testing1 } from './Testing1';

function App() {
	// const src = data.map((song) => song.url);
	// const { togglePlay, stop, playNextTrack, playPreviousTrack, upVolume, downVolume, toggleLoop } =
	// 	usePlayer(src);
	const { pause, play, isPlaying } = useSound({ soundSrc: '/sound/song2.mp3' });
	return (
		<div className='flex gap-3 items-center justify-center'>
			{/* <button onClick={togglePlay}>play</button>
			<button onClick={stop}>stop</button>
			<button onClick={playPreviousTrack}>prev</button>
			<button onClick={playNextTrack}>next</button>
			<button onClick={toggleLoop}>loop</button>
			<div className='flex gap-2'>
				<button onClick={upVolume}>+ Vol</button>
				<button onClick={downVolume}>- Vol</button>
			</div> */}
			<button
				onClick={() => {
					if (isPlaying) {
						pause();
					} else {
						play();
					}
				}}
			>
				song1
			</button>
			<Testing1 />
		</div>
	);
}

export default App;
