# useSound
### When need to use?
If you have more than 1 sound track, and different sound tracks used for different files.
### How to use?
#### 1. SoundProvider need to wrap the outest layer component (Same layer with Mantine Provider)
```typescript
import { Link, Outlet } from 'react-router-dom';
import { SoundProvider } from '../SoundContext';

export const Layout = () => {
	const soundSrcList = ['/sound/clear.mp3', '/sound/tapEffect.mp3'];
	return (
		<SoundProvider soundSrcList={soundSrcList}>
				<nav>
					<ul>
						<Link to='/'>Home</Link>
						<li>
							<Link to='/blogs'>Blogs</Link>
						</li>
						<li>
							<Link to='/contact'>Contact</Link>
						</li>
					</ul>
				</nav>
				<Outlet />
		</SoundProvider>
	);
};
```

#### 2. In your component file, you may use like this:
``` typescript
import { useSoundContext } from "./SoundContext";

export const Testing1 = () => {
	const soundInstances = useSoundContext() || [];
	const play = (index: number) => soundInstances[index]?.play();

	return (
		<button
			onClick={() => play(0)} // 0: means play the first sound track from the array list
		>
			Testing1
		</button>
	);
};
```
## useSound's method and state
### play
A method that plays the sound.
### stop
A method that stops the sound.
### pause
 A method that pauses the sound.
### isPlaying
 A boolean property indicating if the sound is currently playing.


# useClickSound
### When need to use?
If you only has 1 sound track and used for entire project.
### How to use?
#### 1. Create a custom hook file in your hooks folder with the code below:
```typescript
import { Howl } from 'howler';
import { useCallback, useEffect, useRef } from 'react';

const preloadSound = async () => {
	const clickSound = new Howl({
		src: '/sounds/tapEffect.mp3', // you may replace your own sound track path here
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
```
#### 2. You may use play in your compoenent file like this:
``` typescript
import { useClickSound } from "./hooks/useClickSound";

export const Testing2 = () => {
  const { play } = useClickSound();
	
	return (
		<button
			onClick={() => play()}
		>
			Testing2
		</button>
	);
};
```
# usePlayer
### When need to use?
If your sound track is a song or ringtone rather than sound effect which no need to trigger pause.
### How to use?
``` typescript
import { usePlayer } from './hooks/usePlayer';
import data from '../data/data.json';

export const Testing3 = () => {
  const src = data.map((song) => song.url);
  const { togglePlay, stop, playNextTrack, playPreviousTrack, upVolume, downVolume, toggleLoop } =
	 	usePlayer(src);
	
	return (
      <>
			  <button onClick={togglePlay}>play</button>
				 		<button onClick={stop}>stop</button>
				 		<button onClick={playPreviousTrack}>prev</button>
				 		<button onClick={playNextTrack}>next</button>
				 		<button onClick={toggleLoop}>loop</button>
				 		<div className='flex gap-2'>
				 			<button onClick={upVolume}>+ Vol</button>
				 			<button onClick={downVolume}>- Vol</button>
				 		</div>
      </>
	);
};
```

## usePlayer's Function and State
### isPlaying
The state of current sound track whether it is playing or not.
### volume
Show the volume of the current sound track.
### currentTrack
Show the current sound track path.
### isStop
The state of current sound track whether it is stopped or not.
### isLoop
The state of current sound track whether it is looping or not.
### upVolume
Used for increasing the sound volume.
### downVolume
Used fot descreasing the sound volume.
### togglePlay
For controlling the state of play (whether it is pause or play).
### toggleLoop
For controlling the state of loop (whether it is loop or not).
### stop
Stop the current sound.
### handleSeek
Sets the current position of the audio playback to the specified time.
### playNextTrack
Play next audio
### playPreviousTrack
Play previous audio
### handleVolume
Handles the volume change event.
